// ** React Imports
import { Ref, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

// ** Custom Component Import

// ** Icon Imports
import { InputAdornment } from '@mui/material'
import IconifyIcon from '../icon'
import CustomTextField from '../mui/text-field'

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)',
  },
}))

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogVolunteerForm = ({ show, handleClose }: { show: boolean; handleClose: () => void }) => {
  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth="sm"
        scroll="body"
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: (theme) => `${theme.spacing(5)} !important`,
          }}
        >
          <CustomCloseButton onClick={handleClose}>
            <IconifyIcon icon="tabler:x" fontSize="1.25rem" />
          </CustomCloseButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h5" className="mb-3 text-blue-900 font-bold">
              Fill the Volunteer Forms
            </Typography>
            <Typography className="text-gray-600">
              We are all involved. In building our motherland. #Ghana
            </Typography>
          </Box>
          <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label="Full Name"
                  placeholder="Leonard Carter"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconifyIcon fontSize="1.25rem" icon="tabler:user" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  type="email"
                  label="Email"
                  placeholder="khobbylynx55@gmail.com"
                  helperText="You can use letters, numbers & periods"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconifyIcon fontSize="1.25rem" icon="tabler:mail" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  type="number"
                  label="Phone No."
                  placeholder="123-456-7890"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconifyIcon fontSize="1.25rem" icon="tabler:phone" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Message"
                  placeholder="Type your message here..."
                  sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconifyIcon fontSize="1.25rem" icon="tabler:message" />
                      </InputAdornment>
                    ),
                    sx: {
                      overflow: 'hidden',
                      '& textarea': {
                        overflowX: 'hidden',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogVolunteerForm
