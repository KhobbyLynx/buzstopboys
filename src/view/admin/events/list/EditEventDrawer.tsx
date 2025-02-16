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
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

// ** Custom Component Import
import CustomTextField from '@/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import IconifyIcon from '@/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { updateEvent } from '@/store/events'

// ** Types Imports
import { AppDispatch } from '@/store'
import { EventProps } from '@/types/events'

interface SidebarEditEventType {
  open: boolean
  toggle: () => void
  eventData: EventProps
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const EditEventSchema = yup.object().shape({
  title: yup.string(),
  desc: yup.string(),
  caption: yup.string(),
  venue: yup.string(),
  status: yup.string(),
  hashTags: yup.array(),
  startDate: yup.date().required('Start date is required'),
  endDate: yup.date().required('End date is required'),
  startTime: yup.date().required('Start time is required'),
  endTime: yup.date().required('End time is required'),
})

const SidebarEditEvent = (props: SidebarEditEventType) => {
  // ** Props
  const { open, toggle, eventData } = props

  // ** State
  const [status, setStatus] = useState<string>(eventData.status)
  const [startDate, setStartDate] = useState<Date | null>(new Date(eventData.startDate))
  const [endDate, setEndDate] = useState<Date | null>(new Date(eventData.endDate))
  const [startTime, setStartTime] = useState<Date | null>(new Date(eventData.startTime))
  const [endTime, setEndTime] = useState<Date | null>(new Date(eventData.endTime))
  const [hashTags, setHashTags] = useState<string[]>(eventData.hashTags)

  const handleAddHashtag = () => {
    setHashTags([...hashTags, ''])
  }

  const handleRemoveHashTag = (index: number) => {
    const updatedHashTags = hashTags.filter((_, i) => i !== index)
    setHashTags(updatedHashTags)
  }

  const handleHashTagChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newHashTags = [...hashTags]
    newHashTags[index] = event.target.value
    setHashTags(newHashTags)
  }

  const defaultValues = {
    title: eventData.title,
    desc: eventData.desc,
    caption: eventData.caption,
    imgs: eventData.imgs,
    hashTags: eventData.hashTags,
    startDate: eventData.startDate,
    endDate: eventData.endDate,
    startTime: eventData.startTime,
    endTime: eventData.endTime,
  }

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(EditEventSchema)
  })

  const onSubmit = (data: EventProps) => {
    console.log('Data From Edit Event Form', data)

    dispatch(updateEvent({ ...eventData, ...data, startDate, endDate, startTime, endTime, hashTags }))
    reset()
    toggle()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>Edit Event</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
          }}
        >
          <IconifyIcon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label='Title'
                  onChange={onChange}
                  placeholder="Beach Cleanup Challenge"
                  error={Boolean(errors.title)}
                  {...(errors.title && { helperText: errors.title.message })}
                />
              )}
            />
            <Controller
              name='desc'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label='Description'
                  onChange={onChange}
                  placeholder='Describe the Event'
                  error={Boolean(errors.desc)}
                  {...(errors.desc && { helperText: errors.desc.message })}
                />
              )}
            />
            <Controller
              name='caption'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label='Caption'
                  onChange={onChange}
                  placeholder='Add a caption'
                  error={Boolean(errors.caption)}
                  {...(errors.caption && { helperText: errors.caption.message })}
                />
              )}
            />

            <Box sx={{ mt: '5px', mb: '5px' }}>
              <Typography sx={{ mb: '5px' }}>HashTags</Typography>
              {hashTags.map((hashTag, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  <CustomTextField
                    fullWidth
                    size='small'
                    placeholder={`Add HashTag ${index + 1}`}
                    sx={{ mb: '3px' }}
                    value={hashTag}
                    onChange={(event) => handleHashTagChange(index, event)}
                  />
                  {index === hashTags?.length - 1 &&
                    <IconButton
                      color="primary"
                      onClick={handleAddHashtag}
                      disabled={index !== hashTags?.length - 1}
                    >
                      <IconifyIcon icon='tabler:plus' fontSize={20} />
                    </IconButton>
                  }
                  {hashTags?.length > 1 && (
                    <IconButton
                      color="secondary"
                      onClick={() => handleRemoveHashTag(index)}
                    >
                      <IconifyIcon icon='tabler:x' fontSize={20} />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>

            {/* Date Range Picker */}
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  fullWidth
                  sx={{ mb: 4 }}
                  error={Boolean(errors.startDate)}
                  helperText={errors.startDate?.message}
                />
              )}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  fullWidth
                  sx={{ mb: 4 }}
                  error={Boolean(errors.endDate)}
                  helperText={errors.endDate?.message}
                />
              )}
            />

            {/* Time Pickers */}
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  fullWidth
                  sx={{ mb: 4 }}
                  error={Boolean(errors.startTime)}
                  helperText={errors.startTime?.message}
                />
              )}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  fullWidth
                  sx={{ mb: 4 }}
                  error={Boolean(errors.endTime)}
                  helperText={errors.endTime?.message}
                />
              )}
            />

            <CustomTextField
              select
              fullWidth
              value={status}
              sx={{ mb: 4 }}
              label='Status'
              onChange={e => setStatus(e.target.value)}
              SelectProps={{ value: status, onChange: e => setStatus(e.target.value as string) }}
            >
              <MenuItem value='upcoming'>Upcoming</MenuItem>
              <MenuItem value='past'>Past</MenuItem>
              <MenuItem value='suspended'>Suspended</MenuItem>
            </CustomTextField>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button type='submit' variant='contained' sx={{ mr: 3 }}>
                Submit
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </LocalizationProvider>
      </Box>
    </Drawer>
  )
}

export default SidebarEditEvent