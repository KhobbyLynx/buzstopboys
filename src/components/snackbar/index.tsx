// ** React Imports
import { Fragment, SyntheticEvent } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

interface SnackBarProps {
  open: boolean
  handleOpen: () => void
  message: string
  variant?: 'standard' | 'filled' | 'outlined'
  color?: 'success' | 'error' | 'info' | 'warning'
  vertical?: 'top' | 'bottom'
  horizontal?: 'left' | 'right' | 'center'
}

const SnackbarAlert = ({
  open,
  handleOpen,
  color,
  variant,
  message,
  vertical = 'bottom',
  horizontal = 'left',
}: SnackBarProps) => {
  const position = { vertical, horizontal }

  const handleClose = (event?: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    handleOpen()
  }

  return (
    <Fragment>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        key={vertical + horizontal}
        anchorOrigin={position}
      >
        <Alert
          variant={variant || 'filled'}
          severity={color || 'info'}
          onClose={handleClose}
          sx={{ width: '100%' }}
          //   elevation={skin === 'bordered' ? 0 : 3}
        >
          {message}
        </Alert>
      </Snackbar>
    </Fragment>
  )
}

export default SnackbarAlert
