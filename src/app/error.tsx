'use client'
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: 2,
        background: `
          linear-gradient(135deg, #FF9A8B 0%, #FF6A88 50%, #FF99AC 100%),
          url('/patterns/waves.svg') repeat
        `,
        backgroundSize: 'cover',
        color: 'white',
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: '6rem', fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
      >
        500
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Internal Server Error
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        Something went wrong on our end. Please try again later.
      </Typography>
      <Link href="/" passHref>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white' }}
        >
          Go to Homepage
        </Button>
      </Link>
    </Box>
  );
}
