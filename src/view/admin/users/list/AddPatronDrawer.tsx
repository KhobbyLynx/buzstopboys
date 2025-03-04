// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
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

// ** Types Imports
import { RootState, AppDispatch } from '@/store'
import { PatronDatabaseType, PatronType } from '@/types/patron'
import { getUsers, handleAdminRegisterPatron } from '@/store/users'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between',
}))

const AddPatronSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  address: yup.string(),
  contact: yup
    .number()
    .typeError('Contact must be a number')
    .min(9, (obj: any) => showErrors('Contact Number', obj.value.length, obj.min)),
  firstname: yup.string().min(2, (obj: any) => showErrors('First Name', obj.value.length, obj.min)),
  lastname: yup.string().min(2, (obj: any) => showErrors('Last Name', obj.value.length, obj.min)),
  username: yup
    .string()
    .min(3, (obj: any) => showErrors('Username', obj.value.length, obj.min))
    .required(),
})

const defaultValues = {
  email: '',
  firstname: '',
  lastname: '',
  username: '',
  contact: 0,
  address: '',
}

const SidebarAddPatron = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [role, setRole] = useState<string>('patron')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.users)

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(AddPatronSchema),
  })

  const onSubmit = (data: PatronType) => {
    // Check if users exist in store, if not fetch them
    if (store.users.length === 0) {
      dispatch(getUsers())
    }

    try {
      const requiredUserData = {
        ...data,
        role,
        type: 'admin',
      }

      dispatch(handleAdminRegisterPatron(requiredUserData)) // Register user
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('error creating user - admin', error)
      }
    } finally {
      // Reset Form
      handleClose()
    }
  }

  const handleClose = () => {
    setRole('patron')
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
        <Typography variant="h5">Add Patron</Typography>
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
            name="firstname"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="First Name"
                onChange={onChange}
                placeholder="Samuel Kofi"
                error={Boolean(errors.firstname)}
                {...(errors.firstname && { helperText: errors.firstname.message })}
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Last Name"
                onChange={onChange}
                placeholder="Tetteh"
                error={Boolean(errors.lastname)}
                {...(errors.lastname && { helperText: errors.lastname.message })}
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Username"
                onChange={onChange}
                placeholder="lynx"
                error={Boolean(errors.username)}
                {...(errors.username && { helperText: errors.username.message })}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type="email"
                label="Email"
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.email)}
                placeholder="khobbylynx55@email.com"
                {...(errors.email && { helperText: errors.email.message })}
              />
            )}
          />
          <Controller
            name="contact"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type="number"
                value={value}
                sx={{ mb: 4 }}
                label="Contact"
                onChange={onChange}
                placeholder="053-715-1049"
                error={Boolean(errors.contact)}
                {...(errors.contact && { helperText: errors.contact.message })}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Address"
                onChange={onChange}
                placeholder="Kasoa, Downtown"
                error={Boolean(errors.address)}
                {...(errors.address && { helperText: errors.address.message })}
              />
            )}
          />
          <CustomTextField
            select
            fullWidth
            value={role}
            sx={{ mb: 4 }}
            label="Select Role"
            onChange={(e) => setRole(e.target.value)}
            SelectProps={{ value: role, onChange: (e) => setRole(e.target.value as string) }}
          >
            <MenuItem value="patron">Patron</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="agent">Agent</MenuItem>
          </CustomTextField>
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

export default SidebarAddPatron
