'use client'
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 20,
        color: 'black',
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: '6rem', fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        Sorry, the page you are looking for does not exist or has been moved.
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
