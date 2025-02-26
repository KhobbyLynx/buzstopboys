'use client'
// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from '@/components/mui/text-field'

// ** IconifyIcon Imports
import IconifyIcon from '@/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { handleRegisterPatron } from '@/store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { useRouter } from 'next/navigation'
import { CircularProgress } from '@mui/material'
import FallbackSpinner from '@/components/spinner'
import Image from 'next/image'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(() => ({
  width: '25rem',
  margin: '0 auto',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
}))

const LinkStyled = styled(Link)(() => ({
  textDecoration: 'none',
  color: '#7367F0',
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(() => ({
  marginTop: '12px',
  marginBottom: '14px',
  '& .MuiFormControlLabel-label': {
    color: '#6b7280',
  },
}))

// ** Login Schema
const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Enter a valid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
})

const defaultValues = {
  username: 'lynx',
  password: 'Testing123@',
  email: 'help@gmail.com',
}

interface FormData {
  username: string
  email: string
  password: string
}

const Register = () => {
  // ** State
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [agree, setAgree] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const store = useSelector((state: RootState) => state.auth)

  const { pending } = store

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = async (data: FormData) => {
    // Check if T&C checked
    if (!agree) {
      // Error Display in the password HelperText
      setError('password', {
        type: 'manual',
        message: 'Agree to Terms and Privacy Policy',
      })

      return
    }

    setLoading(true)
    try {
      const resultAction = await dispatch(handleRegisterPatron(data))

      // Check if action was fulfilled
      if (handleRegisterPatron.fulfilled.match(resultAction)) {
        router.push('/')
      } else {
        // Handle the case where the action was rejected
        if (
          typeof resultAction.payload === 'string' &&
          resultAction.payload.includes('auth/email-already-in-use')
        ) {
          setError('password', {
            type: 'manual',
            message: 'Email Already In Use',
          })
        } else if (
          typeof resultAction.payload === 'string' &&
          resultAction.payload.includes('auth/network-request-failed')
        ) {
          setError('password', {
            type: 'manual',
            message: 'Network Error',
          })
        } else {
          setError('password', {
            type: 'manual',
            message: 'Registration failed. Please try again.',
          })
        }
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      // Error Display in the password HelperText
      setError('password', {
        type: 'manual',
        message: `${error instanceof Error ? error.message : 'An unknown error occurred'}`,
      })
    }
  }

  if (pending) {
    return <FallbackSpinner />
  }

  return (
    <Box
      className="content-center"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
      }}
    >
      <Card>
        <CardContent sx={{ px: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Link href="/">
              <Image src="/images/logos/logo_black.png" alt="logo" width={90} height={90} />
            </Link>
          </Box>
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
              Create a new account
            </Typography>
            <Typography sx={{ color: '#6b7280' }}>Join BuzStopBoys now!</Typography>
          </Box>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 4 }}>
              <Controller
                name="username"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    autoFocus
                    label="Username"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder="Lynx55"
                    error={Boolean(errors.username)}
                    {...(errors.username && { helperText: errors.username.message })}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: 4 }}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    autoFocus
                    label="Email"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder="khobbylynx55@gmail.com"
                    error={Boolean(errors.email)}
                    {...(errors.email && { helperText: errors.email.message })}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: 1.5 }}>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onBlur={onBlur}
                    label="Password"
                    onChange={onChange}
                    id="auth-login-v2-password"
                    error={Boolean(errors.password)}
                    {...(errors.password && { helperText: errors.password.message })}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <IconifyIcon
                              fontSize="1.25rem"
                              icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
            <FormControlLabel
              control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ color: '#6b7280' }}>I agree to </Typography>
                  <Typography
                    component={LinkStyled}
                    href="/"
                    onClick={(e) => e.preventDefault()}
                    sx={{ marginLeft: '4px' }}
                  >
                    privacy policy & terms
                  </Typography>
                </Box>
              }
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ marginBottom: '16px', backgroundColor: '#1976d2', color: '#fff' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign up'}
            </Button>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: '#6b7280', marginRight: '8px' }}>
                Already have an account?
              </Typography>
              <Typography component={LinkStyled} href="/log-in">
                Sign in instead
              </Typography>
            </Box>
            <Divider sx={{ marginY: 2, fontSize: '14px', color: '#6b7280' }}>or</Divider>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton
                href="/"
                component={Link}
                sx={{ color: '#db4437' }}
                onClick={(e) => e.preventDefault()}
              >
                <IconifyIcon icon="mdi:google" />
              </IconButton>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Register
