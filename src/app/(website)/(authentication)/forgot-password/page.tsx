'use client'
// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Custom Component Import
import CustomTextField from '@/components/mui/text-field'

// ** IconifyIcon Imports
import IconifyIcon from '@/components/icon'
import Image from 'next/image'

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

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(() => ({
  width: '25rem',
  margin: '0 auto',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
}))

const LinkStyled = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: '#1976d2',
  fontSize: '16px',
}))

const ForgotPassword = () => {
  return (
    <Box
      className="content-center"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f5fa',
      }}
    >
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent sx={{ padding: '40px' }}>
            <Box
              sx={{
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
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                Forgot Password? 🔒
              </Typography>
              <Typography sx={{ color: '#6c757d', fontSize: '14px' }}>
                Enter your email and we’ll send you instructions to reset your password
              </Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
              <CustomTextField
                autoFocus
                fullWidth
                type="email"
                label="Email"
                sx={{ marginBottom: '24px' }}
                placeholder="khobbylynx55@gmail.com"
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  marginBottom: '24px',
                  padding: '12px',
                  fontSize: '16px',
                  backgroundColor: '#1976d2',
                }}
              >
                Send reset link
              </Button>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                }}
              >
                <LinkStyled href="/log-in">
                  <IconifyIcon fontSize="1.25rem" icon="tabler:chevron-left" />
                  <span>Back to login</span>
                </LinkStyled>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  )
}

export default ForgotPassword
