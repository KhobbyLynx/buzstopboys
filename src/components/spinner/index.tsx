// ** MUI Imports
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'

const FallbackSpinner = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#00218F', // Light background
      }}
    >
      {/* Logo */}
      <Image src={'/images/logos/buzstopboys.png'} alt="Logo" width={100} height={100} />

      {/* Loading Spinner */}
      <CircularProgress
        disableShrink
        sx={{
          mt: 2,
          color: '#ffffff',
        }}
      />
    </Box>
  )
}

export default FallbackSpinner
