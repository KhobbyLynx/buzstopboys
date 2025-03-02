// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

// ** Custom Component Import

// ** Icon Imports
import { InputAdornment } from '@mui/material'
import IconifyIcon from '../icon'
import CustomTextField from '../mui/text-field'
import { generatePaymentReference } from '@/utils/utils'
import { detectCurrency } from '@/utils/getUserOrigin'
import { DONATIONTYPE } from '@/types/transactions'
import { Toast } from '@/utils/toast'
import axiosRequest from '@/utils/axiosRequest'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { handleNewTransaction } from '@/store/transactions'

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)',
  },
}))

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogDonateForm = ({
  show,
  handleClose,
  amount,
  donationType,
  donationId,
}: {
  show: boolean
  handleClose: () => void
  amount: number | null
  donationType: DONATIONTYPE
  donationId: string
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { auth } = useSelector((state: RootState) => ({
    auth: state.auth,
  }))

  const { isLoggedIn, data } = auth

  const handleDonate = async () => {
    if (!amount) {
      return Toast.fire({
        icon: 'error',
        title: 'Invalid Amount',
        text: 'Enter a valid amount',
      })
    }

    try {
      // @ts-ignore
      const { id: userId, username, fullname, email, firstname, lastname } = data

      const donationAmount = amount || 0

      const currency = await detectCurrency()

      const reference = generatePaymentReference()

      const defaultChannels = ['mobile_money', 'card', 'bank_transfer']

      const transactionData = {
        username: fullname || username,
        email,
        amount: donationAmount,
        userId: userId ?? '',
        reference,
        currency,
        transactionType: donationType,
        transactionTypeId: donationId,
      }

      if (typeof window !== 'undefined') {
        // @ts-ignore
        const PaystackPop = (await import('@paystack/inline-js')).default

        const paystack = new PaystackPop()

        paystack.newTransaction({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          amount: donationAmount * 100,
          email,
          currency,
          reference,
          firstname: firstname || username,
          lastname,
          channels: defaultChannels,
          metadata: {
            username,
            userId: userId,
            donationType,
            donationId,
          },
          onSuccess: async (response: any) => {
            console.log('Payment successful:', response)

            const verificationResponse = await axiosRequest.post('/paystack', {
              reference: response.reference,
            })

            const verificationInfo = verificationResponse.data

            const { status } = verificationInfo.data

            dispatch(
              handleNewTransaction({
                ...transactionData,
                verificationInfo,
                status: status ?? 'success',
              })
            )
          },
          onCancel: () => {
            console.log('Payment cancelled')

            dispatch(
              handleNewTransaction({
                ...transactionData,
                status: 'cancelled',
              })
            )
          },
        })
      }
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Payment error occurred', error)
      }
    }
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth="sm"
        scroll="body"
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: (theme) => `${theme.spacing(5)} !important`,
          }}
        >
          <CustomCloseButton onClick={handleClose}>
            <IconifyIcon icon="tabler:x" fontSize="1.25rem" />
          </CustomCloseButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h5" className="mb-3 text-blue-900 font-bold">
              Every Little Bit Counts
            </Typography>
            <Typography className="text-gray-600">
              The nation demands your devotion. #Ghana
            </Typography>
          </Box>
          <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label="Full Name"
                  placeholder="Samuel Tetteh"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconifyIcon fontSize="1.25rem" icon="tabler:user" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  type="email"
                  label="Email"
                  placeholder="khobbylynx55@gmail.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconifyIcon fontSize="1.25rem" icon="tabler:mail" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  type="number"
                  label="Phone No."
                  placeholder="123-456-7890"
                  helperText="Optional"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconifyIcon fontSize="1.25rem" icon="tabler:phone" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {!amount ? (
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    type="number"
                    label="Amount"
                    placeholder="eg. 100"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconifyIcon fontSize="1.25rem" icon="healthicons:ghana" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth onClick={handleDonate}>
                  Donate
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogDonateForm
