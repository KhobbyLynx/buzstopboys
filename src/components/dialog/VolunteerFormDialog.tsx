// ** React Imports
import { Ref, forwardRef, ReactElement } from 'react'

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

// ** Custom Component Import

// ** Icon Imports
import { FormHelperText, InputAdornment } from '@mui/material'
import IconifyIcon from '../icon'
import CustomTextField from '../mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { Toast } from '@/utils/toast'
import { Icon } from '@iconify/react'
import { MessageSource, SenderStatusType } from '@/types/messages'
import { sendMessage } from '@/store/messages'

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
  firstname: yup.string().required('First name is required'),
  lastname: yup.string(),
  email: yup.string().email('Invalid email address').required('Email is required'),
  message: yup.string().required('Message is required'),
  contact: yup.string().matches(/^\d{9,}$/, 'Phone number must be at least 9 digits and numeric'),
})

const DialogVolunteerForm = ({ show, handleClose }: { show: boolean; handleClose: () => void }) => {
  // ** Dispatch
  const dispatch = useDispatch<AppDispatch>()

  // ** Store
  const { sending, data, isLoggedIn } = useSelector((state: RootState) => ({
    sending: state.messages.sending,
    data: state.auth.data,
    isLoggedIn: state.auth.isLoggedIn,
  }))

  const handleAdminSubmit = () => {
    return Toast.fire({
      icon: 'info',
      title: 'Volunteer',
      text: 'Admin can not send a message through the volunteer form',
    })
  }

  // Check if user is logged in and is an admin
  const userIsAdmin = data && data.role === 'admin'

  // Check if app is in dev mode
  const devMode = process.env.NEXT_PUBLIC_NODE_ENV === 'development'

  // ** Default values
  const defaultValues = {
    firstname: isLoggedIn && data?.firstname ? data.firstname : '',
    lastname: isLoggedIn && data?.lastname ? data.lastname : '',
    email: isLoggedIn && data?.email ? data.email : '',
    contact: isLoggedIn && data?.contact ? data.contact : '',
    message: '',
  }

  const {
    reset,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(Schema),
  })

  interface FormDataType {
    firstname: string
    lastname?: string
    email: string
    contact?: string
    message: string
  }

  const onSubmit = (formData: FormDataType) => {
    try {
      // Sender Details
      const senderId = isLoggedIn && data ? data.id : null
      const senderStatus: SenderStatusType = isLoggedIn && data ? 'patron' : 'unregistered'
      const senderInfo = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        contact: formData.contact,
      }
      const source: MessageSource = 'volunteer'

      const requiredData = {
        senderId,
        senderStatus,
        senderInfo,
        source,
        title: 'volunteer',
        content: formData.message,
      }

      // dispatch
      dispatch(sendMessage(requiredData))
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log(
          `${
            error instanceof Error
              ? error.message
              : 'An error occurred submitting volunteer message'
          }`
        )
      }
      setError('message', {
        message: `${
          error instanceof Error ? error.message : 'An error occurred submitting volunteer message'
        }`,
      })
    } finally {
      // close dialog
      handleClose()
      // Reset Form
      handleReset()
    }
  }

  const handleReset = () => {
    if (!sending) {
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
              Fill the Volunteer Forms
            </Typography>
            <Typography className="text-gray-600">
              We are all involved. In building our motherland. #Ghana
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="firstname"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      fullWidth
                      type="firstname"
                      label="First name"
                      placeholder="eg. Samuel"
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      disabled={sending}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconifyIcon fontSize="1.25rem" icon="tabler:user" />
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(errors.firstname)}
                      {...(errors.firstname && { helperText: errors.firstname.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="lastname"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      fullWidth
                      type="lastname"
                      label="Last name"
                      placeholder="eg. Tetteh"
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      disabled={sending}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconifyIcon fontSize="1.25rem" icon="tabler:user" />
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(errors.lastname)}
                      {...(errors.lastname && { helperText: errors.lastname.message })}
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
                      placeholder="khobbylynx55@gmail.com"
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
                  name="contact"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      fullWidth
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      label="Phone No."
                      placeholder="123-456-7890"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconifyIcon fontSize="1.25rem" icon="tabler:phone" />
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(errors.contact)}
                      {...(errors.contact && { helperText: errors.contact.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="message"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <CustomTextField
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      multiline
                      sx={{
                        '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' },
                      }}
                      minRows={3}
                      label="Your message"
                      placeholder="Type your message here..."
                      className="mb-8"
                      disabled={sending}
                      fullWidth
                      error={Boolean(errors.message)}
                      {...(errors.message && { helperText: errors.message.message })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconifyIcon fontSize="1.25rem" icon="tabler:message" />
                          </InputAdornment>
                        ),
                        sx: {
                          overflow: 'hidden',
                          '& textarea': {
                            overflowX: 'hidden',
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  type={userIsAdmin && !devMode ? 'button' : 'submit'}
                  disabled={sending}
                  onClick={userIsAdmin && !devMode ? handleAdminSubmit : undefined}
                  startIcon={
                    <Icon icon={sending ? 'line-md:uploading-loop' : 'mynaui:send-solid'} />
                  }
                  className="w-full md:w-fit hover:bg-blue-500"
                >
                  {sending ? 'Submitting...' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogVolunteerForm
