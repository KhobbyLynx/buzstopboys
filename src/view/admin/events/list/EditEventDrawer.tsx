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
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

// ** Custom Component Import
import CustomTextField from '@/components/modals/mui/text-field'

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
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { FormHelperText } from '@mui/material'

interface SidebarEditEventType {
  open: boolean
  toggle: () => void
  eventData: EventProps
}

interface EventType {
  title: string
  desc: string
  caption: string
  venue: string
}

type EventStatusType = 'upcoming' | 'past' | 'suspended'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between',
}))

const EditEventSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  desc: yup.string().required('Description is required'),
  caption: yup.string().required('Caption is required'),
  venue: yup.string().required('Venue is required'),
})

const SidebarEditEvent = (props: SidebarEditEventType) => {
  // ** Props
  const { open, toggle, eventData } = props

  const { endDate: doneDate, endTime: doneTime } = eventData

  // ** State
  const [status, setStatus] = useState<EventStatusType>(eventData.status)
  const [startDate, setStartDate] = useState<Date | null>(new Date(eventData.startDate))
  // if endDate is undefined its saved in MDB as a ''
  const [endDate, setEndDate] = useState<Date | null>(doneDate ? new Date(doneDate) : null)
  const [startTime, setStartTime] = useState<Date | null>(new Date(eventData.startTime))
  const [endTime, setEndTime] = useState<Date | null>(doneTime ? new Date(doneTime) : null)
  const [hashTags, setHashTags] = useState<string[]>(eventData.hashTags)

  // ** Error States
  const [imgError, setImgError] = useState<string>('')
  const [hashTagError, setHashTagsError] = useState<string>('')
  const [timeStampError, setTimeStampError] = useState<string>('')

  // ** File Upload State
  const [img, setImg] = useState<string | null>(eventData.img)

  // ** Dropzone Logic
  const readAndValidateImage = (file: File) => {
    return new Promise<File>((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const image = new window.Image()
        image.src = event.target?.result as string

        image.onload = () => {
          // Validate size
          if (file.size <= 2 * 1024 * 1024) {
            resolve(file)
          } else {
            reject(new Error('File size exceeds 2 MB.'))
          }
        }
      }

      reader.onerror = () => {
        reject(new Error('Failed to read the file.'))
      }

      reader.readAsDataURL(file)

      reader.onloadend = () => {
        setImg(reader.result as string) // Convert image to Base64
      }
    })
  }

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024, // 2 MB
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    onDrop: async (acceptedFiles) => {
      try {
        await readAndValidateImage(acceptedFiles[0])
      } catch (error: any) {
        if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
          console.log('Error uploading image - OnDrop', error)
        }
      }
    },
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        rejection.errors.forEach((error) => {
          if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
            console.log('Error uploading image - onDropRejected', error)
          }

          if (error.code === 'file-too-large') {
            setImgError('File size exceeds 2 MB.')
          } else if (error.code === 'too-many-files') {
            setImgError('Upload only one file')
          } else if (error.code === 'file-invalid-type') {
            setImgError('Invalid file type. Please upload a PNG, JPG, or JPEG image.')
          } else {
            setImgError('File upload rejected.')
          }
        })
      })
    },
  })

  // ** Handlers for HashTags
  const handleAddHashtag = () => {
    setHashTags([...hashTags, ''])
  }

  const handleRemoveHashTag = (index: number) => {
    const updatedHashTags = hashTags.filter((_, i) => i !== index)
    setHashTags(updatedHashTags)
  }

  const handleHashTagChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newHashTags = [...hashTags]
    newHashTags[index] = event.target.value
    setHashTags(newHashTags)
  }

  const defaultValues = {
    title: eventData.title,
    desc: eventData.desc,
    caption: eventData.caption,
    venue: eventData.venue,
  }

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** UseEffect
  useEffect(() => {
    setTimeout(() => {
      setImgError('')
    }, 5000)

    setTimeout(() => {
      setHashTagsError('')
    }, 5000)

    setTimeout(() => {
      setTimeStampError('')
    }, 5000)
  }, [imgError, hashTagError, timeStampError])

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(EditEventSchema),
  })

  const onSubmit = (data: EventType) => {
    // Validation
    if (!img) {
      return setImgError('An image is required')
    }

    if (!startDate || !startTime) {
      return setTimeStampError('Start Date and Start Time are required')
    }

    if (hashTags.length === 0 || hashTags[0] === '') {
      return setHashTagsError('At least one hash tag is required')
    }

    // Dispatch
    try {
      const modifiedData = {
        ...eventData,
        ...data,
        startDate: startDate?.toISOString() || '',
        endDate: endDate?.toISOString() || '',
        startTime: startTime?.toISOString() || '',
        endTime: endTime?.toISOString() || '',
        hashTags,
        status,
        img,
      }

      // Check if image was updated
      const removedImage = img === eventData.img ? '' : eventData.img

      dispatch(updateEvent({ modifiedData, removedImage }))
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error updating event', error)
      }

      throw new Error(error instanceof Error ? error.message : 'An error occurred updating event')
    } finally {
      // Reset Form
      handleClose()
    }
  }

  const handleClose = () => {
    setStartDate(new Date(eventData.startDate))
    setEndDate(doneDate ? new Date(doneDate) : null)
    setStartTime(new Date(eventData.startTime))
    setEndTime(doneTime ? new Date(doneTime) : null)
    setHashTags(eventData.hashTags)
    setImg(eventData.img)
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
      sx={{ '& .MuiDrawer-paper': { width: { xs: 400, sm: 600 } } }}
    >
      <Header>
        <Typography variant="h5">Edit Event</Typography>
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  placeholder="Beach Cleanup Challenge"
                  error={Boolean(errors.title)}
                  {...(errors.title && { helperText: errors.title.message })}
                />
              )}
            />
            <Controller
              name="desc"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label="Description"
                  onChange={onChange}
                  placeholder="Describe the Event"
                  error={Boolean(errors.desc)}
                  {...(errors.desc && { helperText: errors.desc.message })}
                />
              )}
            />
            <Controller
              name="caption"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label="Caption"
                  onChange={onChange}
                  placeholder="Add a caption"
                  error={Boolean(errors.caption)}
                  {...(errors.caption && { helperText: errors.caption.message })}
                />
              )}
            />
            <Controller
              name="venue"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label="Venue"
                  onChange={onChange}
                  placeholder="eg. Kaneshie Market"
                  error={Boolean(errors.caption)}
                  {...(errors.caption && { helperText: errors.caption.message })}
                />
              )}
            />

            {/* Dropzone */}
            {imgError && (
              <FormHelperText error sx={{ mb: 1 }}>
                {imgError}
              </FormHelperText>
            )}
            <Box
              {...getRootProps()}
              sx={{ p: 3, border: '1px dashed gray', cursor: 'pointer', mb: 2 }}
            >
              <input {...getInputProps()} />
              <Typography>Drag & drop an image here, or click to select a file</Typography>
            </Box>

            {/* Display old image if new file is not uploaded */}
            {img && (
              <Box sx={{ position: 'relative', mb: 4 }}>
                <Image
                  src={img}
                  alt="eventImg"
                  width={80}
                  height={80}
                  style={{
                    borderRadius: 8,
                    objectFit: 'cover',
                    width: 'auto', // Ensures aspect ratio is maintained
                  }}
                />
                <IconButton
                  onClick={() => setImg(null)}
                  sx={{ position: 'absolute', top: 0, right: 0, background: 'white' }}
                >
                  <IconifyIcon icon="tabler:x" fontSize={16} />
                </IconButton>
              </Box>
            )}

            {/* Date Range Pickers */}
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { mb: 4 },
                  },
                }}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { mb: 4 },
                  },
                }}
              />
            </Box>
            {timeStampError && (
              <FormHelperText error sx={{}}>
                {timeStampError}
              </FormHelperText>
            )}
            {/* Time Pickers */}
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { mb: 4 },
                  },
                }}
              />
              <TimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { mb: 4 },
                  },
                }}
              />
            </Box>
            {/* HashTags */}
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
                    size="small"
                    placeholder={`Add HashTag ${index + 1}`}
                    sx={{ mb: '3px' }}
                    value={hashTag}
                    onChange={(event) => handleHashTagChange(index, event)}
                  />
                  {index === hashTags?.length - 1 && (
                    <IconButton
                      color="primary"
                      onClick={handleAddHashtag}
                      disabled={index !== hashTags?.length - 1}
                    >
                      <IconifyIcon icon="tabler:plus" fontSize={20} />
                    </IconButton>
                  )}
                  {hashTags?.length > 1 && (
                    <IconButton color="secondary" onClick={() => handleRemoveHashTag(index)}>
                      <IconifyIcon icon="tabler:x" fontSize={20} />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>
            {hashTagError && (
              <FormHelperText error sx={{ mt: 1 }}>
                {hashTagError}
              </FormHelperText>
            )}
            {/* Status */}
            <CustomTextField
              select
              fullWidth
              value={status}
              sx={{ mb: 4, mt: 4 }}
              label="Select Status"
              onChange={(e) => setStatus(e.target.value as EventStatusType)}
              SelectProps={{
                value: status,
                onChange: (e) => setStatus(e.target.value as EventStatusType),
              }}
            >
              <MenuItem value="upcoming">upcoming</MenuItem>
              <MenuItem value="past">past</MenuItem>
              <MenuItem value="suspended">suspended</MenuItem>
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
        </LocalizationProvider>
      </Box>
    </Drawer>
  )
}

export default SidebarEditEvent
