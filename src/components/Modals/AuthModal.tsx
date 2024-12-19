'use client'
import { useState } from 'react';
import { Box, Slide, Divider, Modal, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/navigation';

function AuthModal({ toggleModal, show }: { toggleModal: () => void, show: boolean }) {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const router = useRouter();

  const handleLoginClick = async () => {
    setLoadingLogin(true);
    await router.push('/log-in');
    setLoadingLogin(false);
  };

  const handleSignUpClick = async () => {
    setLoadingSignUp(true);
    await router.push('/sign-up');
    setLoadingSignUp(false);
  };

  return (
    <section className="py-6">
      <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
        <Slide direction="down" in={show} timeout={500}>
          <Box sx={{ bgcolor: "background.paper", boxShadow: 24, p: 4, width: 400 }} className="rounded">
            <XMarkIcon className="h-6 w-6 ms-auto text-red-500 cursor-pointer" onClick={toggleModal} />
            <Typography variant="h6" className="text-center pt-2 pb-2">
              Create an account to stay connected and track your impact.
            </Typography>
            <Divider className="m-4" color="gray" />
            <Box className="flex flex-col gap-4 pt-4 w-full">
              <LoadingButton variant="outlined" loading={loadingLogin} onClick={handleLoginClick}>
                Log In
              </LoadingButton>
              <LoadingButton variant="contained" loading={loadingSignUp} onClick={handleSignUpClick}>
                Sign Up
              </LoadingButton>
            </Box>
          </Box>
        </Slide>
      </Modal>
    </section>
  );
}

export default AuthModal;