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
import { addDonationOption } from '@/store/slides/donations'

// ** Types Imports
import { DonationOptionType } from '@/types/donations'
import { AppDispatch, RootState } from '@/store'

interface SidebarAddDonationOptionType {
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between',
}))

const AddDonationOptionSchema = yup.object().shape({
  amount: yup.number().required('Amount is required'),
  name: yup.string().required('Option name is required'),
})

const defaultValues = {
  name: '',
  amount: 100,
}

const SidebarAddDonationOption = (props: SidebarAddDonationOptionType) => {
  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.donations)
  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(AddDonationOptionSchema),
  })

  const onSubmit = (data: DonationOptionType) => {
    // Validation
    const names = new Set(store.donationOptions.map((u) => u.name))
    const amounts = new Set(store.donationOptions.map((u) => u.amount))

    if (names.has(data.name)) return setError('name', { message: 'Option name already exists!' })
    if (amounts.has(data.amount)) return setError('amount', { message: 'Can not use same amount!' })

    try {
      dispatch(addDonationOption(data))
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log(
          `${
            error instanceof Error
              ? error.message
              : 'An error occurred submitting new donation option data'
          }`
        )
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
        <Typography variant="h5">Add New Option</Typography>
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
                placeholder="eg.GHS 100"
                error={Boolean(errors.amount)}
                {...(errors.amount && { helperText: errors.amount.message })}
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

export default SidebarAddDonationOption
