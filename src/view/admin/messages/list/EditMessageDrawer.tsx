// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { FormHelperText, Tooltip } from '@mui/material'

// ** Custom Component Import
import CustomTextField from '@/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import IconifyIcon from '@/components/icon'

// ** Store Imports
import { AppDispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { updateMessage } from '@/store/messages'

// ** Types Imports
import {
  MessagesProps,
  AdminSubmitMessageType,
  SenderStatusType,
  MessageSource,
} from '@/types/messages'
import { Toast } from '@/utils/toast'

interface SidebarEditMessageType {
  open: boolean
  toggle: () => void
  messageData: MessagesProps
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between',
}))

const EditMessageSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Message content is required'),
})

const SidebarEditMessage = (props: SidebarEditMessageType) => {
  // ** Props
  const { open, toggle, messageData } = props

  // ** State
  const [receiverId, setReceiverId] = useState<string>(messageData.id)

  const defaultValues: AdminSubmitMessageType = {
    title: messageData.title,
    content: messageData.content,
  }

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { sending, data, isLoggedIn } = useSelector((state: RootState) => ({
    sending: state.messages.sending,
    data: state.auth.data,
    isLoggedIn: state.auth.isLoggedIn,
  }))

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(EditMessageSchema),
  })

  const onSubmit = (formData: AdminSubmitMessageType) => {
    if (!isLoggedIn || !data?.id) {
      return Toast.fire({
        icon: 'error',
        title: 'Invalid Authentication',
        text: 'You are Not Authorised',
      })
    }

    try {
      // Admin Id
      const editorId = data.id

      // Organise required data
      const requiredData = {
        id: messageData.id,
        ...formData,
        editorId,
      }

      // dispatch with required data
      dispatch(updateMessage(requiredData))
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.error('Error updating Message - onSubmit', error)
      }
    } finally {
      // Reset Form
      handleClose()
    }
  }

  const handleClose = () => {
    setReceiverId(messageData.id)
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant="h5">Edit Message</Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
          }}
        >
          <IconifyIcon icon="tabler:x" fontSize="1.125rem" />
        </IconButton>
      </Header>
      <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Title"
                onChange={onChange}
                disabled={sending}
                placeholder="eg. Volunteer"
                error={Boolean(errors.title)}
                {...(errors.title && { helperText: errors.title.message })}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            rules={{ required: true }}
            render={({ field: { onBlur, onChange, value } }) => (
              <CustomTextField
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                rows={4}
                multiline
                label="Your message"
                placeholder="Type your message here..."
                className="mb-8"
                disabled={sending}
                fullWidth
                error={Boolean(errors.content)}
                {...(errors.content && { helperText: errors.content.message })}
                InputProps={{
                  sx: {
                    overflow: 'hidden',
                    '& textarea': {
                      overflowX: 'hidden',
                    },
                  },
                }}
              />
            )}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <Button type="submit" variant="contained" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarEditMessage
