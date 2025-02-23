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
import { CircularProgress, Tooltip } from '@mui/material'

// ** Icon Imports
import Icon from '@/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from '@/components/mui/chip'

// ** Utils Import
import { formatDate } from '@/utils/utils'

// ** Actions Imports
import { deleteEvent, getEvents } from '@/store/events'

// ** Third Party Imports
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Types
import { AppDispatch, RootState } from '@/store'
import { EventProps } from '@/types/events'

// ** Custom Table Components Imports
import TableHeader from '@/view/admin/events/list/TableHeader'

// ** Sidebar Components
import SidebarAddEvent from '@/view/admin/events/list/AddEventDrawer'
import SidebarEditEvent from '@/view/admin/events/list/EditEventDrawer'
import { ThemeColor } from '@/layouts/types'
import { useRouter } from 'next/navigation'

interface StatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: EventProps
}

const StatusObj: StatusType = {
  upcoming: 'info',
  past: 'error',
  suspended: 'warning',
}

const RowOptions = ({ eventID, data }: { eventID: string; data: EventProps }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [editEventOpen, setEditEventOpen] = useState<boolean>(false)

  const toggleEditEventDrawer = () => setEditEventOpen(!editEventOpen)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    MySwal.fire({
      title: 'Delete Event',
      text: 'Are you sure you would like to delete this Event?',
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
        dispatch(deleteEvent({ id: eventID, imgUrl: data.img }))

        MySwal.fire({
          icon: 'success',
          title: 'Delete!',
          text: 'Deleting Event...',
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
    toggleEditEventDrawer()
    handleRowOptionsClose()
  }

  const handleView = () => {
    router.push(`/admin/events/${eventID}`)
    handleRowOptionsClose()
  }

  return (
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
        <MenuItem onClick={handleView} sx={{ '& svg': { mr: 2 } }}>
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

      {/* Edit Modal */}
      <SidebarEditEvent open={editEventOpen} toggle={toggleEditEventDrawer} eventData={data} />
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
                href={`/admin/events/${row.id}`}
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
    flex: 0.14,
    minWidth: 140,
    field: 'startDate',
    headerName: 'Start Date',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {formatDate(row.startDate).date}
        </Typography>
      )
    },
  },
  {
    flex: 0.13,
    minWidth: 130,
    field: 'endDate',
    headerName: 'End Date',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.endDate ? formatDate(row.endDate).date : '-'}
        </Typography>
      )
    },
  },
  {
    flex: 0.13,
    minWidth: 130,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin="light"
          size="small"
          label={row.status}
          color={StatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
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
      return <RowOptions eventID={row.id} data={row} />
    },
  },
]

const DashEvents = () => {
  // ** State
  const [addNewEventOpen, setAddNewEventOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.events)

  const { events, pending } = store

  useEffect(() => {
    // Fetch Events
    if (events.length === 0) {
      dispatch(getEvents())
    }
  }, [dispatch])

  const toggleAddEventDrawer = () => setAddNewEventOpen(!addNewEventOpen)

  if (pending) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={6} sx={{ mt: 1 }}>
      <Grid item xs={12} lg={12}>
        <Card>
          <CardHeader title="List of Events" />
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader toggle={toggleAddEventDrawer} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={events}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      {/* Create Modal */}
      <SidebarAddEvent open={addNewEventOpen} toggle={toggleAddEventDrawer} />
    </Grid>
  )
}

export default DashEvents
