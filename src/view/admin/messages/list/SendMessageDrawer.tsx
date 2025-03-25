// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { Tooltip } from '@mui/material'

// ** Custom Component Import
import CustomTextField from '@/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import IconifyIcon from '@/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'

// ** Actions Imports
import { sendMessage } from '@/store/slides/messages'

// ** Types Imports
import { AdminSubmitMessageType, MessageSource, SenderStatusType } from '@/types/messages'
import { Toast } from '@/utils/toast'

interface SidebarSendMessageType {
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between',
}))

const SendMessageSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Message content is required'),
})

const SidebarSendMessage = (props: SidebarSendMessageType) => {
  // ** Props
  const { open, toggle } = props

  // ** States
  const [receiverId, setReceiverId] = useState<string>('')

  const defaultValues = {
    content: '',
    title: '',
  }

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state)

  // ** Auth
  const { isLoggedIn, data } = store.auth

  // ** Users
  const { users } = store.users

  // ** Loader state for sending a message
  const { sending } = store.messages

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(SendMessageSchema),
  })

  const onSubmit = (formData: AdminSubmitMessageType) => {
    if (!isLoggedIn || !data?.id) {
      return Toast.fire({
        icon: 'error',
        title: 'Invalid Authentication',
        text: 'You are Not Authorised',
      })
    }

    // ** Dispatch
    try {
      // Sender Details || Admin details
      const senderId = data.id
      const senderStatus: SenderStatusType = 'admin'
      const source: MessageSource = 'inbox'

      // Organise required data
      const requiredData = {
        senderId,
        senderStatus,
        source,
        title: formData.title,
        content: formData.content,
        receiverId,
      }

      console.log('---------sendMessage--------')
      console.log(requiredData)
      console.log('---------sendMessage--------')

      // dispatch with required data
      dispatch(sendMessage(requiredData))
    } catch (error: any) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error sending message - onSubmit', error)
      }
    } finally {
      // Reset Form
      handleClose()
    }
  }

  const handleClose = () => {
    setReceiverId('')
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
        <Typography variant="h5">Send Message</Typography>
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
          <CustomTextField
            select
            fullWidth
            value={receiverId}
            sx={{ mb: 4 }}
            label="Receiver Id"
            onChange={(e) => setReceiverId(e.target.value)}
            SelectProps={{
              value: receiverId,
              onChange: (e) => setReceiverId(e.target.value as string),
            }}
          >
            {users.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                <Tooltip title={u.fullname} placement="top-start">
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '200px',
                    }}
                  >
                    {u.username}
                  </Typography>
                </Tooltip>
                <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                  {u.email}
                </Typography>
              </MenuItem>
            ))}
          </CustomTextField>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

export default SidebarSendMessage
