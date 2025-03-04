'use client'

import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid'
import IconifyIcon from '@/components/icon'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  InputAdornment,
} from '@mui/material'
import CustomTextField from '@/components/mui/text-field'
import { Icon } from '@iconify/react'
import { MessageSubmitType, MessageSource, SenderStatusType } from '@/types/messages'
import { sendMessage } from '@/store/messages'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { Toast } from '@/utils/toast'

export function ContactForm() {
  // ** Yup Schema
  const contactSchema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string(),
    email: yup.string().email('Invalid email address').required('Email is required'),
    message: yup.string().required('Message is required'),
    title: yup.string().required('Please select an option'),
    contact: yup.number().typeError('Contact must be a number').min(9, 'Contact must be a number'),
  })

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
      title: 'Send Message',
      text: 'Admin can not send a message through the contact form',
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
    contact: isLoggedIn && data?.contact ? Number(data.contact) : 0,
    message: '',
    title: '',
  }

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(contactSchema),
  })

  const onSubmit = (formData: MessageSubmitType) => {
    try {
      // Convert number to string
      const contact = String(formData.contact)

      // Sender Details
      const senderId = isLoggedIn && data ? data.id : null
      const senderStatus: SenderStatusType = isLoggedIn && data ? 'patron' : 'unregistered'
      const senderInfo = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        contact,
      }
      const source: MessageSource = 'contact' // "inbox" | "contact"

      const requiredData = {
        senderId,
        senderStatus,
        senderInfo,
        source,
        title: formData.title,
        content: formData.message,
      }

      // dispatch
      dispatch(sendMessage(requiredData))
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log(
          `${error instanceof Error ? error.message : 'An error occurred submitting message'}`
        )
      }
      setError('message', {
        message: `${
          error instanceof Error ? error.message : 'An error occurred submitting message'
        }`,
      })
    } finally {
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
    <section className="mb-20 lg:mb-40 px-0 pt-[64px]" id="contact_form">
      <div>
        <Card className="container mx-auto border border-gray/50">
          <CardContent className="grid grid-cols-1 lg:grid-cols-7 md:gap-10">
            <div className="w-full col-span-3 rounded-lg h-full py-8 p-5 md:p-16 bg-gray-900 bg-[url('/images/banner/event.jpeg')] bg-cover">
              <Typography variant="h4" color="white" className="mb-2">
                Send Us a Message
              </Typography>
              <Typography variant="body2" className="mx-auto mb-8 text-base !text-gray-100">
                Fill out the volunteer/Support form or contact us directly via email.
              </Typography>
              <div className="flex gap-5">
                <PhoneIcon className="h-6 w-6 text-white" />
                <Typography variant="h6" color="white" className="mb-2">
                  +233 537 151 049
                </Typography>
              </div>
              <div className="flex my-2 mb-10 gap-5">
                <EnvelopeIcon className="h-6 w-6 text-white" />
                <Typography variant="h6" color="white" className="mb-2">
                  buzstopboys@gmail.com
                </Typography>
              </div>
              <div className="flex items-center gap-5">
                <IconifyIcon icon="fa6-brands:square-x-twitter" className="w-6 h-6 text-gray-100" />
                <IconifyIcon icon="fa-brands:facebook" className="w-6 h-6 text-gray-100" />
                <IconifyIcon icon="ri:instagram-fill" className="w-6 h-6 text-gray-100" />
                <IconifyIcon icon="ix:youtube-filled" className="w-6 h-6 text-gray-100" />
                <IconifyIcon icon="ic:round-tiktok" className="w-6 h-6 text-gray-100" />
              </div>
            </div>
            <div className="w-full mt-8 md:mt-0 md:px-10 col-span-4 h-full p-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8 grid gap-4 lg:grid-cols-2">
                  <Controller
                    name="firstname"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        name="firstname"
                        label="First name"
                        variant="standard"
                        placeholder="eg. Samuel"
                        size="medium"
                        className="!min-w-full mb-3 md:mb-0"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        disabled={sending}
                        InputLabelProps={{ shrink: true }}
                        error={Boolean(errors.firstname)}
                        {...(errors.firstname && { helperText: errors.firstname.message })}
                      />
                    )}
                  />

                  <Controller
                    name="lastname"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        label="Last name"
                        variant="standard"
                        placeholder="eg. Tetteh"
                        color="primary"
                        size="medium"
                        disabled={sending}
                        className="!min-w-full mb-3 md:mb-0"
                        InputLabelProps={{ shrink: true }}
                        error={Boolean(errors.lastname)}
                        {...(errors.lastname && { helperText: errors.lastname.message })}
                      />
                    )}
                  />
                </div>
                <div className="mb-8 grid gap-4 lg:grid-cols-2">
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        label="Email"
                        variant="standard"
                        placeholder="eg. buzstopboys@gmail.com"
                        color="primary"
                        size="medium"
                        disabled={sending}
                        className="!min-w-full mb-3 md:mb-0"
                        InputLabelProps={{ shrink: true }}
                        error={Boolean(errors.email)}
                        {...(errors.email && { helperText: errors.email.message })}
                      />
                    )}
                  />

                  <Controller
                    name="contact"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        type="number"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        label="Phone Number"
                        variant="standard"
                        placeholder="enter phone number"
                        color="primary"
                        size="medium"
                        disabled={sending}
                        className="!min-w-full mb-3 md:mb-0"
                        InputLabelProps={{ shrink: true }}
                        error={Boolean(errors.contact)}
                        {...(errors.contact && { helperText: errors.contact.message })}
                      />
                    )}
                  />
                </div>

                <Controller
                  name="title"
                  control={control}
                  defaultValue="volunteer"
                  rules={{ required: 'Please select an option' }}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel id="title" className="text-sm mt-6">
                        <Typography variant="body2" className="!text-blue-gray-500 mb-2">
                          What are you interested in?
                        </Typography>
                      </FormLabel>
                      <RadioGroup
                        {...field}
                        id="title"
                        className="flex items-center justify-center"
                      >
                        <div className={errors.title ? 'ml-3' : 'ml-3 mb-10'}>
                          {['volunteer', 'sponsor', 'donate', 'other'].map((option) => (
                            <FormControlLabel
                              key={option}
                              value={option}
                              control={<Radio disabled={sending} />}
                              label={option.charAt(0).toUpperCase() + option.slice(1)}
                              sx={{
                                '.MuiFormControlLabel-label': {
                                  fontSize: '14px',
                                },
                              }}
                            />
                          ))}
                        </div>
                      </RadioGroup>
                      {errors.title && (
                        <FormHelperText error className="mb-10">
                          {errors.title.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name="message"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <CustomTextField
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      rows={4}
                      multiline
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
                <div className="w-full flex justify-end mt-6 md:mt-4">
                  <Button
                    type={userIsAdmin && !devMode ? 'button' : 'submit'}
                    disabled={sending}
                    onClick={userIsAdmin && !devMode ? handleAdminSubmit : undefined}
                    startIcon={
                      <Icon icon={sending ? 'line-md:uploading-loop' : 'mynaui:send-solid'} />
                    }
                    className="w-full md:w-fit hover:bg-blue-500"
                    variant="contained"
                  >
                    {sending ? 'Sending' : 'Send message'}
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default ContactForm
