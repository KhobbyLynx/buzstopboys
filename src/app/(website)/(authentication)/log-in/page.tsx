'use client'
// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import Image from 'next/image'

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
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

// ** Store
import { handleLoginPatron } from '@/store/slides/auth'

// ** Custom Component Import
import CustomTextField from '@/components/mui/text-field'

// ** Icon Imports
import IconifyIcon from '@/components/icon'

// ** Types
import { AppDispatch, RootState } from '@/store'

import { CircularProgress } from '@mui/material'
import FallbackSpinner from '@/components/spinner'
import { handleGoogleAuth } from '@/utils/handleGoogleAuth'

// ** Styled Components
const Card = styled(MuiCard)({
  width: '25rem',
  margin: 'auto',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
})

const LinkStyled = styled(Link)({
  textDecoration: 'none',
  color: '#2196F3',
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

let password = ''
let email = ''

// Set default values in development mode
if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
  password = 'Testing123@'
  email = 'help@gmail.com'
}

const defaultValues = {
  password,
  email,
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

  useEffect(() => {
    console.log('Loading state changed:', loading)
  }, [loading])

  const handleGoogleLogin = async () => {
    setLoading(true)
    await handleGoogleAuth({ dispatch, router, setError, setLoading }).then(() => {
      setTimeout(() => {
        setLoading(false)
      }, 15000) // 15 secs
    })
  }

  const onSubmit = async (userData: FormData) => {
    // Set loading state
    setLoading(true)

    try {
      const resultAction: any = await dispatch(handleLoginPatron(userData))

      if (resultAction.meta?.requestStatus === 'fulfilled') {
        console.log('Auth Result - Fulfilled:', resultAction)
        // Navigate to home
        router.push('/')

        setTimeout(() => {
          setLoading(false)
        }, 15000) // 15 secs

        return
      }
    } catch (error) {
      setLoading(false)
      // Error Display in the password HelperText
      setError('password', {
        type: 'manual',
        message: (error instanceof Error && error.message) || 'An unknown error occurred',
      })
    } finally {
      setLoading(false)
    }
  }

  if (pending || loading) {
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
        backgroundColor: '#2196F3',
      }}
    >
      <Card>
        <CardContent sx={{ padding: '2rem 2.5rem' }}>
          <Box
            sx={{
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Link href="/">
              <Image
                src="/images/logos/logo_black.png"
                alt="logo"
                width={90}
                height={90}
                priority
              />
            </Link>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Welcome to BuzStopBoys!
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
                    placeholder="eg. lynx@gmail.com"
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
                    placeholder="Enter your password"
                    onChange={onChange}
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
              sx={{ marginBottom: '16px', backgroundColor: '#2196F3', color: '#fff' }}
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
            <Divider sx={{ marginY: 2, fontSize: '14px', color: '#6b7280' }}>or</Divider>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton
                href="/"
                component={Link}
                sx={{ color: '#db4437' }}
                onClick={handleGoogleLogin}
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

export default Login
