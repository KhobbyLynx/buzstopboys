'use client'
// @mui material components
import { Box, Button, Slide, Divider, Modal, Typography } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { formatAmount } from "./src/utils/utils";
import AuthModal from "./AuthModal";
import { useState } from "react";

interface DonationCampaignCardProps {
  toggleModal: ()=> void
  handeCampaignDonate: ()=> void
  show: boolean
  img: string;
  target: number;
  raised: number;
  title: string;
  desc: string;
  isLoggedIn: boolean
  status: string
}

function DonationCampaignModal({toggleModal, show, img, target, title, desc, raised, status, isLoggedIn, handeCampaignDonate}: DonationCampaignCardProps) {
  const [showInnerModal, setShowInnerModal] = useState<boolean>(false)
  const toggleInnerModal = () => setShowInnerModal(!showInnerModal)
  return (
    <section className="py-6">
      <div>
        <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={show} timeout={500}>
            <Box 
             sx={{
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: '80%',
              maxWidth: 800,
              maxHeight: '80vh',
              overflow: 'auto',
            }}
            className="rounded mx-auto">
                <Image src={img} alt={title}  layout="responsive" width={400} height={200} />
                <Typography variant="h6" className="text-center pt-2 pb-2">{title}</Typography>
                <Typography className="text-center pt-1 pb-2">{desc}</Typography>
                <Divider className="m-4" color="gray" />
                <Box className="flex justify-between items-center my-3">
                <Typography className="text-center pt-1 pb-2 font-normal text-green-900 uppercase">Target: {formatAmount(target)}</Typography>
                <Typography className="text-center pt-1 pb-2 font-normal text-blue-900 uppercase">Raised: {formatAmount(raised)}</Typography>
                </Box>
                <Box className="flex flex-col gap-4 pt-4 w-full">
                    <Button 
                      variant="contained" 
                      disabled={status !== "active"}
                      onClick={
                      ()=> {
                        !isLoggedIn ? toggleInnerModal() : handeCampaignDonate() 
                      }
                    }>{status === 'completed' ? 'Target Reached' : 'Donate Toward a Purpose'}</Button>
                </Box>
            </Box>
          </Slide>
        </Modal>
            <AuthModal toggleModal={toggleInnerModal} show={showInnerModal} />
      </div>
    </section>
  );
}

export default DonationCampaignModal;