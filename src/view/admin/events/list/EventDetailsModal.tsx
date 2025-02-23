import { Box, Typography, Modal, IconButton, Avatar } from '@mui/material'
import IconifyIcon from '@/components/icon'
import { EventProps } from '@/types/events'

interface EventDetailsModalProps {
  open: boolean
  onClose: () => void
  event: EventProps
}

const EventDetailsModal = ({ open, onClose, event }: EventDetailsModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Event Details</Typography>
          <IconButton onClick={onClose}>
            <IconifyIcon icon="tabler:x" />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Title:</Typography>
          <Typography variant="body1">{event.title}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Description:</Typography>
          <Typography variant="body1">{event.desc}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Date Range:</Typography>
          <Typography variant="body1">
            {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Time:</Typography>
          <Typography variant="body1">
            {event.startTime} - {event.endTime}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Caption:</Typography>
          <Typography variant="body1">{event.caption}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Status:</Typography>
          <Typography variant="body1">{event.status}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Hashtags:</Typography>
          <Typography variant="body1">{event.hashTags.join(', ')}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Images:</Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Avatar src={event.img} alt='Event Image' sx={{ width: 56, height: 56 }} />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Created At:</Typography>
          <Typography variant="body1">{new Date(event.createdAt).toLocaleString()}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Updated At:</Typography>
          <Typography variant="body1">{new Date(event.updatedAt).toLocaleString()}</Typography>
        </Box>
      </Box>
    </Modal>
  )
}

export default EventDetailsModal