import { useState } from "react";

// @mui material components
import { Box, Button, Slide, Divider, Modal } from "@mui/material";

function SimpleModal({toggleModal, show}:{toggleModal:()=>void, show:boolean}) {
  return (
    <section className="py-6">
        <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={show} timeout={500}>
            <Box sx={{ bgcolor: "background.paper", boxShadow: 24, p: 4, width: 400 }}>
                <h2>Hello Modal</h2>
                <Divider sx={{ my: 0 }} />

                <Box sx={{ p: 2 }}>
                    <Button variant="outlined" onClick={()=> toggleModal()}>Proceed</Button>
                    <Button variant="contained" onClick={()=> toggleModal()}>Close</Button>
                </Box>
            </Box>
          </Slide>
        </Modal>
    </section>
  );
}

export default SimpleModal;