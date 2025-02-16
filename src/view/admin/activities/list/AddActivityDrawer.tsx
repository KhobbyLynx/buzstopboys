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
import { addActivity, updateActivity } from '@/store/activities'

// ** Types Imports
import { AppDispatch } from '@/store'
import { ActivityProps, AddActivityType } from '@/types/activities'

interface SidebarEditActivityType {
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const EditActivitySchema = yup.object().shape({
  title: yup
  .string()
  .required('Title is required'),
  desc: yup
  .string()
  .required('Activity Description is required'),
  caption: yup
  .string()
  .required('Caption is required'),
})

const Icons = {
  'nrk:globe': 'Globe',
  'si:heart-fill': 'Heart',
  'mdi:lightbulb-on': 'Light',
  'heroicons:academic-cap-solid': 'Education',
  'octicon:sponsor-tiers-16': 'Sponsor',
  'healthicons:i-training-class-outline': 'Training',
  'healthicons:miner-worker-alt-outline': 'Work'
}

const SidebarAddActivity = (props: SidebarEditActivityType) => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [icon, setIcon] = useState<string>('nrk:globe')

    // ** Details
    const [details, setDetails] = useState<string[]>(['']);

    const handleAddDetail = () => {
      setDetails([...details, '']); // Add an empty string for a new detail
    };
  
    const handleRemoveDetail = (index: number) => {
      const updatedDetails = details.filter((_, i) => i !== index); // Remove the detail at the given index
      setDetails(updatedDetails);
    };
  
    const handleDetailChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newDetails = [...details];
      newDetails[index] = event.target.value; // Update the value of the specific detail
      setDetails(newDetails);
    };
 
    // ** Video Urls
    const [videoUrls, setVideoUrls] = useState<string[]>(['']);

    const handleAddVideoUrl = () => {
      setVideoUrls([...videoUrls, '']); 
    };
  
    const handleRemoveVideoUrl = (index: number) => {
      const updatedVideoUrl = videoUrls.filter((_, i) => i !== index); // Remove the url at the given index
      setVideoUrls(updatedVideoUrl);
    };
  
    const handleVideoUrlChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newVideoUrls = [...videoUrls];
      newVideoUrls[index] = event.target.value; // Update the value of the specific url
      setVideoUrls(newVideoUrls);
    };

  const defaultValues = {
    title: '',
    desc: '',
    caption: '',
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
    resolver: yupResolver(EditActivitySchema)
  })

  interface SubmitActivityDataType {
    title: string
    desc: string
    caption: string
  }

  const onSubmit = (data: SubmitActivityDataType) => {
    console.log('Data From Add Activity Form',{...data, icon, details, videoUrls})

    dispatch(addActivity({...data, icon, details, videoUrls}))
    reset()
    toggle()
  }

const handleClose = () => {
  setDetails([''])
  setVideoUrls([''])
  setIcon('nrk:globe')
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
        <Typography variant='h5'>Add Activity</Typography>
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
                placeholder="eg. Sanitation"
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
                placeholder='Describe the activity'
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
          <Box sx={{mt: '5px', mb: '5px'}}>
              <Typography sx={{mb: '5px'}}>Details</Typography>
                {details.map((detail, index) => (
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
                      size = 'small'
                      placeholder={`Add Detail ${index + 1}`}
                      sx={{mb: '3px' }}
                      value={detail}
                      onChange={(event) => handleDetailChange(index, event)}
                    />
                    {index === details?.length - 1 &&
                      <IconButton
                        color="primary"
                        onClick={handleAddDetail}
                        disabled={index !== details?.length - 1}
                        >
                        <IconifyIcon icon='tabler:plus' fontSize={20} />
                      </IconButton>
                    }
                    {details?.length > 1 && (
                      <IconButton
                      color="secondary"
                      onClick={() => handleRemoveDetail(index)}
                      >
                        <IconifyIcon icon='tabler:x' fontSize={20} />
                      </IconButton>
                    )}
                  </Box>
              ))}
            </Box>
          
          <Box sx={{mt: '5px', mb: '5px'}}>
              <Typography sx={{mb: '5px'}}>Video Urls</Typography>
                {videoUrls.map((url, index) => (
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
                      size = 'small'
                      placeholder={`Add Url ${index + 1}`}
                      sx={{mb: '3px' }}
                      value={url}
                      onChange={(event) => handleVideoUrlChange(index, event)}
                    />
                    {index === videoUrls?.length - 1 &&
                      <IconButton
                        color="primary"
                        onClick={handleAddVideoUrl}
                        disabled={index !== videoUrls?.length - 1}
                        >
                        <IconifyIcon icon='tabler:plus' fontSize={20} />
                      </IconButton>
                    }
                    {videoUrls?.length > 1 && (
                      <IconButton
                      color="secondary"
                      onClick={() => handleRemoveVideoUrl(index)}
                      >
                        <IconifyIcon icon='tabler:x' fontSize={20} />
                      </IconButton>
                    )}
                  </Box>
              ))}
            </Box>
          <CustomTextField
            select
            fullWidth
            value={icon}
            sx={{ mb: 4 }}
            label='Select Icon'
            onChange={e => setIcon(e.target.value)}
            SelectProps={{ value: icon, onChange: e => setIcon(e.target.value as string) }}
          >
            <MenuItem value='nrk:globe'>Globe</MenuItem>
            <MenuItem value='si:heart-fill'>Heart</MenuItem>
            <MenuItem value='mdi:lightbulb-on'>Light</MenuItem>
            <MenuItem value='heroicons:academic-cap-solid'>Education</MenuItem>
            <MenuItem value='octicon:sponsor-tiers-16'>Sponsor</MenuItem>
            <MenuItem value='healthicons:i-training-class-outline'>Training</MenuItem>
            <MenuItem value='healthicons:miner-worker-alt-outline'>Work</MenuItem>
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
      </Box>
    </Drawer>
  )
}

export default SidebarAddActivity
