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
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

// ** Third Party Import
import * as yup from 'yup'

// ** Icon Imports
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
} from '@mui/material'
import IconifyIcon from '../icon'
import CustomTextField from '../mui/text-field'
import { generatePaymentReference } from '@/utils/utils'
import { detectCurrency } from '@/utils/getUserOrigin'
import { DONATIONTYPE } from '@/types/transactions'
import { Toast } from '@/utils/toast'
import axiosRequest from '@/utils/axiosRequest'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { handleNewTransaction } from '@/store/slides/transactions'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SnackbarAlert from '../snackbar'

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

// ** Yup Schema
const Schema = yup.object().shape({
  fullname: yup.string().required('A name is required'),
  email: yup
    .string()
    .required('Email is required to complete donation')
    .email('Invalid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .optional()
    .matches(/^\d{9,}$/, 'Phone number must be at least 9 digits and numeric'),
  amount: yup
    .string()
    .optional()
    .matches(/^\d+$/, 'Amount must be a number') // Ensure only digits (numbers)
    .test('is-greater-than-5', 'Amount must be greater than 5', (value) => {
      return value ? parseFloat(value) > 5 : false
    }),
  payment: yup.string().required('Please select a payment method'),
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
  // ** States
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [error, setError] = useState('')
  const handleOpenSnackbar = () => setOpenSnackbar(!openSnackbar)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { auth } = useSelector((state: RootState) => ({
    auth: state.auth,
  }))

  const { isLoggedIn, data } = auth

  const { id: userId, username, fullname, email, firstname, lastname } = data || {}

  // Default Values
  const defaultValues = {
    fullname: isLoggedIn && fullname ? fullname : username || '',
    email: isLoggedIn && email ? email : '',
    payment: '',
    amount: '',
  }

  const methods = {
    'Mobile money': 'mobile_money',
    'Visa/Master Card': 'card',
    'Bank Transfer': 'bank_transfer',
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    // resolver: yupResolver(Schema),
  })

  interface FormDataType {
    fullname: string
    email: string
    payment: string
    amount?: string
  }

  const onSubmit = async (formData: FormDataType) => {
    if (!amount && (parseInt(formData.amount || '') ?? 0) < 5) {
      handleOpenSnackbar()
      setError('Invalid Amount')
      return
    }

    try {
      const donationAmount =
        parseInt(amount?.toString() || '') || parseInt(formData.amount?.toString() || '')

      // const currency = await detectCurrency()
      const currency = 'GHS' // NB: Other currencies are not allowed hence defaulted to GHS

      const reference = generatePaymentReference()

      const paymentMethod = [formData.payment]

      const transactionData = {
        username: fullname || username,
        email: email || formData.email,
        amount: donationAmount ?? null,
        userId: userId || 'unregistered',
        reference,
        currency,
        transactionType: donationType,
        transactionTypeId: donationId,
      }

      if (typeof window !== 'undefined') {
        // @ts-ignore
        const PaystackPop = (await import('@paystack/inline-js')).default

        const paystack = new PaystackPop()

        console.log(
          'Parameters',
          email || formData.email,
          lastname,
          (donationAmount ?? 0) * 100,
          paymentMethod
        )

        paystack.newTransaction({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          amount: (donationAmount ?? 0) * 100,
          email: email || formData.email,
          currency,
          reference,
          firstname: firstname || formData.fullname || username,
          lastname: lastname || '',
          channels: paymentMethod,
          metadata: {
            userId: userId || 'unregistered',
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
    } finally {
      // Close Dialog
      handleClose()
      // Reset Form
      reset()
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Controller
                  name="fullname"
                  control={control}
                  rules={{ required: 'Full name is required' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      fullWidth
                      label="Full Name"
                      placeholder="eg. Samuel Tetteh"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconifyIcon fontSize="1.25rem" icon="tabler:user" />
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(errors.fullname)}
                      {...(errors.fullname && { helperText: errors.fullname.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: 'An email is required to complete donation.' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      fullWidth
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      type="email"
                      label="Email"
                      placeholder="eg. khobbylynx55@gmail.com"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconifyIcon fontSize="1.25rem" icon="tabler:mail" />
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(errors.email)}
                      {...(errors.email && { helperText: errors.email.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="payment"
                  control={control}
                  defaultValue="Mobile Money"
                  rules={{ required: 'Please select a payment method' }}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel id="payment" className="text-sm">
                        <Typography variant="body2" className="!text-blue-gray-500 mb-2">
                          Please select a payment method?
                        </Typography>
                      </FormLabel>
                      <RadioGroup
                        {...field}
                        id="title"
                        className="flex items-center justify-center"
                      >
                        <div className={errors.payment ? '' : 'mb-3'}>
                          {(['Mobile money', 'Visa/Master Card', 'Bank Transfer'] as const).map(
                            (option) => (
                              <FormControlLabel
                                key={option}
                                value={methods[option]}
                                control={<Radio />}
                                label={option.charAt(0).toUpperCase() + option.slice(1)}
                                sx={{
                                  '.MuiFormControlLabel-label': {
                                    fontSize: '14px',
                                  },
                                }}
                              />
                            )
                          )}
                        </div>
                      </RadioGroup>
                      {errors.payment && (
                        <FormHelperText error className="mb-3">
                          {errors.payment.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              {!amount ? (
                <Grid item xs={12}>
                  <Controller
                    name="amount"
                    control={control}
                    rules={{
                      validate: (value) =>
                        !/^\d+$/.test(value)
                          ? 'Only numbers are allowed'
                          : Number(value) <= 4
                          ? 'Amount must be 5 or more'
                          : true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        fullWidth
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        label="Amount"
                        placeholder="eg. 100"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconifyIcon fontSize="1.25rem" icon="healthicons:ghana" />
                            </InputAdornment>
                          ),
                        }}
                        error={Boolean(errors.amount)}
                        {...(errors.amount && { helperText: errors.amount.message })}
                      />
                    )}
                  />
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  startIcon={
                    <InputAdornment position="start">
                      <IconifyIcon
                        fontSize="1rem"
                        className="text-gray-300"
                        icon="streamline:give-gift-solid"
                      />
                    </InputAdornment>
                  }
                >
                  Donate
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <SnackbarAlert
        open={openSnackbar}
        handleOpen={handleOpenSnackbar}
        color="error"
        variant="filled"
        message={error}
        horizontal="right"
      />
    </Card>
  )
}

export default DialogDonateForm
