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
import { updateDonationCampaign } from '@/store/donations'

// ** Types Imports
import { AppDispatch } from '@/store'

type CampaignStatus = 'active' | 'suspended' | 'completed'

interface CampaignEditType {
  title: string
  desc: string
  target: number
  raised: number
  subText: string
  status: CampaignStatus
  img: string
}

interface SidebarEditCampaignType {
  open: boolean
  toggle: () => void
  campaignData: CampaignEditType
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const EditCampaignSchema = yup.object().shape({
  title: yup
  .string(),
  desc: yup
  .string(),
  subText: yup
  .string(),
  target: yup
  .number()
  .min(100, 'Donation Target must be greater than 100'),
  raised: yup
  .number()
})

const SidebarEditDonationCampaign = (props: SidebarEditCampaignType) => {
  // ** Props
  const { open, toggle, campaignData } = props

  const defaultValues = {
    title: campaignData.title,
    desc: campaignData.desc,
    subText: campaignData.subText,
    target: campaignData.target,
    raised: campaignData.raised,
    img: campaignData.img,
  }

  // ** State
  const [status, setStatus] = useState<'active' | 'suspended' | 'completed'>(campaignData.status ? campaignData.status : 'active')

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
    resolver: yupResolver(EditCampaignSchema)
  })

  const onSubmit = (data: CampaignEditType) => {
    console.log('Data From Edit Campaign Form', data, status)

    dispatch(updateDonationCampaign({...campaignData, ...data, status}))
    reset()
    toggle()
  }

const handleClose = () => {
    setStatus('active')
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
        <Typography variant='h5'>Edit Campaign</Typography>
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
                placeholder="Clean Up Korle Gonno Beach"
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
                placeholder='Describe the campaign'
                error={Boolean(errors.desc)}
                {...(errors.desc && { helperText: errors.desc.message })}
              />
            )}
          />
          <Controller
            name='subText'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='subText'
                onChange={onChange}
                placeholder='More about donation campaign'
                error={Boolean(errors.subText)}
                {...(errors.subText && { helperText: errors.subText.message })}
              />
            )}
          />
          <Controller
            name='target'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='number'
                value={value}
                sx={{ mb: 4 }}
                label='Donation Target'
                onChange={onChange}
                placeholder='GHS 6000'
                error={Boolean(errors.target)}
                {...(errors.target && { helperText: errors.target.message })}
              />
            )}
          />
          <Controller
            name='raised'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='number'
                value={value}
                sx={{ mb: 4 }}
                label='Amount Raised'
                onChange={onChange}
                placeholder='GHS 2000'
                error={Boolean(errors.raised)}
                {...(errors.raised && { helperText: errors.raised.message })}
              />
            )}
          />

<CustomTextField
  select
  fullWidth
  value={status}
  sx={{ mb: 4 }}
  label='Select Status'
  onChange={e => setStatus(e.target.value)}
  SelectProps={{ value: status, onChange: e => setStatus(e.target.value as string) }}
>
  <MenuItem value='active'>active</MenuItem>
  <MenuItem value='suspended'>suspended</MenuItem>
  <MenuItem value='completed'>completed</MenuItem>
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

export default SidebarEditDonationCampaign
