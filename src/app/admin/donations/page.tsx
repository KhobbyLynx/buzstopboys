'use client'
// ** React Imports
import { useState, useEffect, MouseEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { CircularProgress, LinearProgress, Tooltip } from '@mui/material'

// ** Icon Imports
import Icon from '@/components/icon'

// ** Store Imports
import { AppDispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from '@/components/mui/chip'

// ** Utils Import
import { calculatePercentage, formatAmount, formatDate } from '@/utils/utils'

// ** Actions Imports
import {
  deleteDonationCampaign,
  getDonationOptions,
  getDonationsCampaigns,
} from '@/store/slides/donations'

// ** Third Party Imports
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Custom Table Components Imports
import CardOptionsList from '@/components/cards/CardOptionsList'
import TableHeader from '@/view/admin/donations/list/TableHeader'

// ** Sidebar Components
import SidebarAddDonationCampaign from '@/view/admin/donations/list/AddDonationCampaignDrawer'
import SidebarEditDonationCampaign from '@/view/admin/donations/list/EditDonationCampaignDrawer'

// ** Types
import { DonationCampaignProps } from '@/types/donations'
type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

interface StatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: DonationCampaignProps
}

const StatusObj: StatusType = {
  active: 'info',
  suspended: 'error',
  completed: 'success',
}

const ProgressBar = ({ percentage, color }: { percentage: number; color: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ width: 96, mr: 1 }}>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 5,
          backgroundColor: `${color}.100`,
          '& .MuiLinearProgress-bar': {
            backgroundColor: `${color}.500`,
          },
        }}
      />
    </Box>
    <Box sx={{ minWidth: 35 }}>
      <Typography variant="body2" color="text.secondary">{`${percentage}%`}</Typography>
    </Box>
  </Box>
)

const RowOptions = ({ patronID, data }: { patronID: string; data: DonationCampaignProps }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [editCampaignOpen, setEditCampaignOpen] = useState<boolean>(false)

  const toggleEditCampaignDrawer = () => setEditCampaignOpen(!editCampaignOpen)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    MySwal.fire({
      title: 'Delete Campaign',
      text: 'Are you sure you would like to delete Donation Campaign?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2',
      },
      buttonsStyling: false,
    }).then(async function (result) {
      if (result.value) {
        // Run delete action
        dispatch(deleteDonationCampaign({ id: patronID, imgUrls: data.imgs }))

        MySwal.fire({
          icon: 'warning',
          title: 'Delete!',
          text: 'Deleting Donation Campaign...',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          },
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Deletion Cancelled!!',
          icon: 'error',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          },
        })
      }
    })

    handleRowOptionsClose()
  }

  const handleEdit = () => {
    toggleEditCampaignDrawer()
    handleRowOptionsClose()
  }

  return (
    <>
      <>
        <IconButton size="small" onClick={handleRowOptionsClick}>
          <Icon icon="tabler:dots-vertical" />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem
            component={Link}
            sx={{ '& svg': { mr: 2 } }}
            href={`/admin/donations/${patronID}`}
            onClick={handleRowOptionsClose}
          >
            <Icon icon="tabler:eye" fontSize={20} />
            View
          </MenuItem>
          <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="uil:edit" fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:trash" fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
      </>
      <>
        {/* Edit Modal */}
        <SidebarEditDonationCampaign
          open={editCampaignOpen}
          toggle={toggleEditCampaignDrawer}
          campaignData={data}
        />
      </>
    </>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 260,
    field: 'title',
    headerName: 'Title',
    renderCell: ({ row }: CellType) => {
      const { title, id } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Tooltip title={row.title} placement="top-start">
              <Typography
                noWrap
                component={Link}
                href={`/admin/donations/${row.id}`}
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
                {title}
              </Typography>
            </Tooltip>
            <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
              {id}
            </Typography>
          </Box>
        </Box>
      )
    },
  },
  {
    flex: 0.25,
    minWidth: 260,
    headerName: 'Description',
    field: 'desc',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title={row.desc} placement="top-start">
          <Typography
            noWrap
            sx={{
              fontWeight: 500,
              color: 'text.secondary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '200px',
            }}
          >
            {row.desc}
          </Typography>
        </Tooltip>
      )
    },
  },
  {
    flex: 0.15,
    minWidth: 136,
    headerName: 'Target',
    field: 'target',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {formatAmount(row.target)}
        </Typography>
      )
    },
  },
  {
    flex: 0.15,
    minWidth: 136,
    headerName: 'Raised',
    field: 'raised',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {formatAmount(row.raised)}
        </Typography>
      )
    },
  },
  {
    flex: 0.12,
    minWidth: 200,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={row.status}
          color={StatusObj[row.status]}
        />
      )
    },
  },
  {
    flex: 0.15,
    minWidth: 200,
    field: 'progress',
    headerName: 'Progress',
    renderCell: ({ row }: CellType) => {
      return (
        <ProgressBar
          percentage={calculatePercentage(row.target, row.raised)}
          color={StatusObj[row.status]}
        />
      )
    },
  },
  {
    flex: 0.1,
    minWidth: 240,
    field: 'createdAt',
    headerName: 'Date Created',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {formatDate(row.createdAt).date}
        </Typography>
      )
    },
  },
  {
    flex: 0.03,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => {
      return <RowOptions patronID={row.id} data={row} />
    },
  },
]

const DashDonations = () => {
  // ** State
  const [addNewCampaignOpen, setAddNewCampaignOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.donations)

  const { donationOptions, donationCampaigns, fetchingCampaigns, fetchingOptions } = store

  useEffect(() => {
    // Fetch Donation Campaigns
    if (donationCampaigns.length === 0) {
      dispatch(getDonationsCampaigns())
    }

    // Fetch Donation Options
    if (donationOptions.length === 0) {
      dispatch(getDonationOptions())
    }
  }, [dispatch, donationCampaigns.length, donationOptions.length])

  const toggleAddCampaignDrawer = () => setAddNewCampaignOpen(!addNewCampaignOpen)

  // if (fetchingCampaigns && fetchingOptions) {
  //   return (
  //     <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
  //       <CircularProgress sx={{ mb: 4 }} />
  //       <Typography>Loading...</Typography>
  //     </Box>
  //   )
  // }

  return (
    <>
      <Grid container spacing={6} sx={{ mt: 1 }}>
        {!fetchingOptions ? (
          <Grid item md={6} xs={12} lg={6}>
            <CardOptionsList data={donationOptions} />
          </Grid>
        ) : (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        )}
        {!fetchingCampaigns ? (
          <Grid item xs={12} lg={12}>
            <Card>
              <CardHeader title="List of Donation Campaigns" />
              <Divider sx={{ m: '0 !important' }} />
              <TableHeader toggle={toggleAddCampaignDrawer} />
              <DataGrid
                autoHeight
                rowHeight={62}
                rows={donationCampaigns}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
              />
            </Card>
          </Grid>
        ) : (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        )}

        {/* Create Modal */}
        <SidebarAddDonationCampaign open={addNewCampaignOpen} toggle={toggleAddCampaignDrawer} />
      </Grid>
    </>
  )
}

export default DashDonations
