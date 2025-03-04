// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from '@/components/icon'

interface TableHeaderProps {
  toggle: () => void
  handleRefresh: () => void
  refreshing: boolean
  submitting: boolean
}
const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { toggle, handleRefresh, refreshing, submitting } = props

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
          <Icon fontSize="1.125rem" icon={submitting ? 'tabler:loader' : 'tabler:plus'} />
          Add New Patron
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
