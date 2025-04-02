// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from '@/components/icon'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { getDonationsCampaigns } from '@/store/slides/donations'
import { useState } from 'react'

interface TableHeaderProps {
  toggle: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { toggle } = props

  // ** State
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()

  const handleRefresh = () => {
    setRefreshing(true)
    dispatch(getDonationsCampaigns()).then(() => {
      setRefreshing(false)
    })
  }

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Button
        onClick={handleRefresh}
        color="primary"
        variant="outlined"
        disabled={refreshing}
        startIcon={<Icon icon={refreshing ? 'tabler:loader' : 'tabler:refresh'} />}
      >
        {refreshing ? 'Refreshing...' : 'Refresh'}
      </Button>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize="1.125rem" icon="tabler:plus" />
          Add New Activity
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
