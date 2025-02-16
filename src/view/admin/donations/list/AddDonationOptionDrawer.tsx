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
import { addDonationOption } from '@/store/donations'

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
  justifyContent: 'space-between'
}))

const AddDonationOptionSchema = yup.object().shape({
  amount: yup
  .number()
  .required('Amount is required'),
  name: yup
  .string()
  .required('Option name is required'),
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
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(AddDonationOptionSchema)
  })

//   const onSubmit = (data: DonationOptionType) => {
//     console.log('Data From Donation Option Add Form', data)
//     if (store.donationOptions.some((u: DonationOptionType) => u.name === data.name || u.amount === data.amount)) {
//       store.donationOptions.forEach((u: DonationOptionType) => {
//         if (u.name === data.name) {
//           setError('name', {
//             message: 'Option name already exists!'
//           })
//         }
//         if (u.amount === data.amount) {
//           setError('amount', {
//             message: 'Can not use same amount!'
//           })
//         }
//       })
//     } else {
//       dispatch(addDonationOption(data))
//       reset()
//       toggle()
//     }
// }

const onSubmit = (data: DonationOptionType) => {
  console.log('Data From Donation Option Add Form', data);

  let nameError = '';
  let amountError = '';

  for (const u of store.donationOptions) {
    if (u.name === data.name) {
      nameError = 'Option name already exists!';
    }
    if (u.amount === data.amount) {
      amountError = 'Can not use same amount!';
    }
  }

  if (nameError) setError('name', { message: nameError });
  if (amountError) setError('amount', { message: amountError });

  if (!nameError && !amountError) {
    dispatch(addDonationOption(data));
    reset();
    toggle();
  }
};

const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>Add New Option</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
          }}
        >
          <IconifyIcon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Name'
                onChange={onChange}
                placeholder="Option's name"
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />
          <Controller
            name='amount'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Amount'
                onChange={onChange}
                placeholder='eg.GHS 100'
                error={Boolean(errors.amount)}
                {...(errors.amount && { helperText: errors.amount.message })}
              />
            )}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddDonationOption
