// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from '@/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import IconifyIcon from '@/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { updateDonationOption } from '@/store/donations'

// ** Types Imports
import { AppDispatch, RootState } from '@/store'
import { EditDonationOptionType } from '@/types/donations'

interface SidebarEditDonationOptionType {
  open: boolean
  toggle: () => void
  OptionData: EditDonationOptionType
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between',
}))

const EditDonationOptionSchema = yup.object().shape({
  name: yup.string().required('Option name is required'),
  amount: yup.number().required('Amount is required'),
  amountRaised: yup.number(),
  numberOfDonors: yup.number(),
})

const SidebarEditDonationOption = (props: SidebarEditDonationOptionType) => {
  // ** Props
  const { open, toggle, OptionData } = props

  const defaultValues = {
    name: OptionData.name,
    amount: OptionData.amount,
    amountRaised: OptionData.amountRaised,
    numberOfDonors: OptionData.numberOfDonors,
  }

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.donations)

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(EditDonationOptionSchema),
  })

  const onSubmit = (data: EditDonationOptionType) => {
    // Validation
    const names = new Set(store.donationOptions.map((u) => u.name))
    const amounts = new Set(store.donationOptions.map((u) => u.amount))

    if (names.has(data.name)) return setError('name', { message: 'Option name already exists!' })
    if (amounts.has(data.amount)) return setError('amount', { message: 'Can not use same amount!' })
    try {
      dispatch(updateDonationOption({ ...OptionData, ...data }))
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`${error instanceof Error ? error.message : 'Error updation donation option'}`)
      }
    } finally {
      // Reset Form
      handleClose()
    }
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant="h5">Edit Donation Option</Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
          }}
        >
          <IconifyIcon icon="tabler:x" fontSize="1.125rem" />
        </IconButton>
      </Header>
      <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Name"
                onChange={onChange}
                placeholder="Option's name"
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Amount"
                onChange={onChange}
                placeholder="eg. GHS 1000"
                error={Boolean(errors.amount)}
                {...(errors.amount && { helperText: errors.amount.message })}
              />
            )}
          />
          <Controller
            name="amountRaised"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Amount Raised"
                onChange={onChange}
                placeholder="eg. GHS 500"
                error={Boolean(errors.amountRaised)}
                {...(errors.amountRaised && { helperText: errors.amountRaised.message })}
              />
            )}
          />
          <Controller
            name="numberOfDonors"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type="number"
                value={value}
                sx={{ mb: 4 }}
                label="Number of Donors"
                onChange={onChange}
                placeholder="GHS 6000"
                error={Boolean(errors.numberOfDonors)}
                {...(errors.numberOfDonors && { helperText: errors.numberOfDonors.message })}
              />
            )}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type="submit" variant="contained" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarEditDonationOption
