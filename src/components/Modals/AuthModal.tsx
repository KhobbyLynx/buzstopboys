'use client'
import { useState } from 'react'
import { Box, Slide, Divider, Modal, Typography, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function AuthModal({ toggleModal, show }: { toggleModal: () => void; show: boolean }) {
  return (
    <section className="py-6">
      <Modal open={show} onClose={toggleModal} sx={{ display: 'grid', placeItems: 'center' }}>
        <Slide direction="down" in={show} timeout={500}>
          <Box
            sx={{ bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}
            className="rounded"
          >
            <XMarkIcon
              className="h-6 w-6 ms-auto text-red-500 cursor-pointer"
              onClick={toggleModal}
            />
            <Typography variant="h6" className="text-center pt-2 pb-2">
              Create an account or log in to stay connected and track your impact.
            </Typography>
            <Divider className="m-4" color="gray" />
            <Box className="flex flex-col gap-4 pt-4 w-full">
              <Link href="/log-in">
                <Button variant="outlined" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="contained" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </Box>
          </Box>
        </Slide>
      </Modal>
    </section>
  )
}

export default AuthModal
