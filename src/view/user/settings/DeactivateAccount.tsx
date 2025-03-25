'use client'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
} from '@mui/material'
import Swal from 'sweetalert2'
import { useForm, Controller } from 'react-hook-form'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'
import { logoutFirebase } from '@/utils/utils'
import SnackbarAlert from '@/components/snackbar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { deleteUser } from '@/store/slides/users'
import { handleLogout } from '@/store/slides/auth'
import { clearLoggedInUserTransactions } from '@/store/slides/transactions'

const MySwal = withReactContent(Swal)

const defaultValues = {
  confirmCheckbox: false,
}

const DeactivateAccount = () => {
  // ** States
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [msg, setMsg] = useState({
    type: 'error',
    message: '',
  })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.auth)

  const { id, role } = store.data || {}
  const { isLoggedIn } = store

  const handleOpenSnackbar = () => setOpenSnackbar(!openSnackbar)

  const [pending, setPending] = useState(false)
  const router = useRouter()
  const auth = getAuth()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log('No user is signed in')
      }
    })
    return () => unsubscribe()
  }, [auth])

  const handleDeleteUser = async () => {
    if (isLoggedIn) {
      try {
        if (id && role) {
          await dispatch(deleteUser({ userId: id, role }))
          await dispatch(handleLogout(id)).then(() => {
            dispatch(clearLoggedInUserTransactions())
            router.push('/')
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
          })
          handleOpenSnackbar()
          setMsg({
            type: 'success',
            message: 'Account Deactivated Successfully',
          })
        } else {
          handleOpenSnackbar()
          setMsg({
            type: 'error',
            message: 'User not found',
          })
          throw new Error('User ID is undefined')
        }
      } catch (error) {
        console.error('Error Deleting Account', error)
        handleOpenSnackbar()
        setMsg({
          type: 'error',
          message: 'Error Deleting Account',
        })
      } finally {
        setPending(false)
      }
    }
  }

  const handleConfirmDelete = () => {
    setPending(true)
    MySwal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you would like to deactivate your account?',
      icon: 'warning',
      confirmButtonColor: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.value) {
        await handleDeleteUser()
        MySwal.fire('Deleted!', 'Your account has been deactivated.', 'success')
      } else {
        setPending(false)
      }
    })
  }

  const onSubmit = (data: typeof defaultValues) => {
    if (data.confirmCheckbox) {
      handleConfirmDelete()
    } else {
      return setError('confirmCheckbox', {
        type: 'manual',
        message: 'Please confirm account deactivation',
      })
    }
  }

  return (
    <>
      <Card className="p-4 shadow-lg">
        <CardHeader className="text-red-500" title="Deactivate Account" />
        <CardContent>
          <Alert severity="warning" className="mb-4">
            <strong>Are you sure you want to delete your account?</strong>
            <p>Once you delete your account, there is no going back. Please be certain.</p>
          </Alert>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              control={control}
              name="confirmCheckbox"
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} color="error" />}
                  label={
                    <span className={errors.confirmCheckbox ? 'text-red-500' : ''}>
                      I confirm my account deactivation
                    </span>
                  }
                />
              )}
            />
            {errors && errors.confirmCheckbox && (
              <Typography color="error" variant="body2">
                Please confirm that you want to delete your account
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              className="bg-red-400"
              disabled={pending}
              fullWidth
            >
              {pending ? <CircularProgress size={24} color="inherit" /> : 'Deactivate Account'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <SnackbarAlert
        open={openSnackbar}
        handleOpen={handleOpenSnackbar}
        color="error"
        variant="filled"
        message={msg.message}
        horizontal="right"
      />
    </>
  )
}

export default DeactivateAccount
