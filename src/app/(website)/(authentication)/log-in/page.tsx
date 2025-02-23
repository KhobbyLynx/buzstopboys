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
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { handleLoginPatron } from '@/store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'

// ** Custom Component Import
import CustomTextField from '@/components/modals/mui/text-field'

// ** Icon Imports
import IconifyIcon from '@/components/icon'
import { useRouter } from 'next/navigation'
import { CircularProgress } from '@mui/material'
import FallbackSpinner from '@/components/spinner'

// ** Demo Imports
const AuthIllustrationV1Wrapper = styled(Box)({
  width: '100%',
  maxWidth: 400,
  position: 'relative',
  '&:before': {
    zIndex: -1,
    top: '-79px',
    content: '""',
    left: '-46px',
    width: '238px',
    height: '234px',
    position: 'absolute',
    backgroundColor: '#E0E7FF',
    borderRadius: '50%',
  },
  '&:after': {
    zIndex: -1,
    content: '""',
    width: '180px',
    right: '-57px',
    height: '180px',
    bottom: '-54px',
    position: 'absolute',
    backgroundColor: '#C7D2FE',
    borderRadius: '50%',
  },
})

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)({
  width: '25rem',
  margin: 'auto',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
})

const LinkStyled = styled(Link)({
  textDecoration: 'none',
  color: '#7367F0',
  fontWeight: 'bold',
})

const FormControlLabel = styled(MuiFormControlLabel)({
  '& .MuiFormControlLabel-label': {
    color: 'rgba(47, 43, 61, 0.68)',
    fontSize: '0.875rem',
  },
})

// ** Login Schema
const loginSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
})

const defaultValues = {
  password: 'Testing123@',
  email: 'help@gmail.com',
}

interface FormData {
  email: string
  password: string
}

const Login = () => {
  // ** State
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(true)
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
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data: FormData) => {
    // Set loading state
    setLoading(true)

    try {
      // Dispatch the login action
      const resultAction = await dispatch(handleLoginPatron(data))

      // Check if the action is fulfilled
      if (handleLoginPatron.fulfilled.match(resultAction)) {
        router.push('/')
      } else {
        // Handle the case where the action was rejected
        if (
          typeof resultAction.payload === 'string' &&
          resultAction.payload.includes('auth/user-not-found')
        ) {
          setError('password', {
            type: 'manual',
            message: 'User not found',
          })
        } else if (
          typeof resultAction.payload === 'string' &&
          resultAction.payload.includes('auth/user-disabled')
        ) {
          setError('password', {
            type: 'manual',
            message: 'Your account has been suspended. Please contact support.',
          })
        } else if (
          typeof resultAction.payload === 'string' &&
          resultAction.payload.includes('auth/network-request-failed')
        ) {
          setError('password', {
            type: 'manual',
            message: 'Network Error',
          })
        } else if (
          typeof resultAction.payload === 'string' &&
          resultAction.payload.includes('auth/wrong-password')
        ) {
          setError('password', {
            type: 'manual',
            message: 'Invalid credentials',
          })
        }
      }

      // Reset loading state
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
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#F9FAFB',
      }}
    >
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent style={{ padding: '2rem 2.5rem' }}>
            <Box
              style={{
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Link href="/">
                <Typography variant="h3" style={{ marginLeft: '0.5rem', fontWeight: 700 }}>
                  BuzStopBoys
                </Typography>
              </Link>
            </Box>
            <Box style={{ marginBottom: '1.5rem' }}>
              <Typography variant="h4" style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
                Welcome to BuzStopBoys! 👋🏻
              </Typography>
              <Typography style={{ color: '#6B7280' }}>Enter your credentials to login</Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
                      placeholder="admin@vuexy.com"
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
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FormControlLabel
                  label="Remember Me"
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                />
                <Typography component={LinkStyled} href="/forgot-password">
                  Forgot Password?
                </Typography>
              </Box>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ marginBottom: '16px', backgroundColor: '#1976d2', color: '#fff' }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Log in'}
              </Button>
              <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography style={{ color: '#6B7280', marginRight: '0.5rem' }}>
                  New on our platform?
                </Typography>
                <Typography component={LinkStyled} href="/sign-up">
                  Create an account
                </Typography>
              </Box>
              <Divider style={{ color: '#9CA3AF', fontSize: '0.8125rem', margin: '1.5rem 0' }}>
                or
              </Divider>
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
      </AuthIllustrationV1Wrapper>
    </Box>
  )
}

export default Login
