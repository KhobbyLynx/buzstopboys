import React from 'react'
import { Box, Container, Divider, Link, Typography, Stack } from '@mui/material'

export default function FooterAdmin() {
  return (
    <Box component="footer" py={4} bgcolor="background.default">
      <Container>
        <Divider sx={{ mb: 2 }} />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()}{' '}
            <Link href="https://samueltetteh.netlify.app" underline="hover">
              Lynx
            </Link>
          </Typography>

          <Stack direction="row" spacing={3}>
            <Link
              href="https://samueltetteh.netlify.app/#about"
              underline="hover"
              color="text.secondary"
            >
              About Us
            </Link>
            <Link
              href="https://samueltetteh.netlify.app/#contact"
              underline="hover"
              color="text.secondary"
            >
              Contact
            </Link>
            <Link href="#" underline="hover" color="text.secondary">
              MIT License
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
