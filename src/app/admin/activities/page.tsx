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

// ** Icon Imports
import Icon from '@/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Utils Import
import { formatDate } from '@/utils/utils'

// ** Actions Imports
import { deleteActivity, getActivities } from '@/store/activities'

// ** Third Party Imports
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Types
import { AppDispatch, RootState } from '@/store'
type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

// ** Custom Table Components Imports
import TableHeader from '@/view/admin/activities/list/TableHeader'
import { CircularProgress, Tooltip } from '@mui/material'

// ** Sidebar Components
import SidebarAddAcitivity from '@/view/admin/activities/list/AddActivityDrawer'
import SidebarEditActivity from '@/view/admin/activities/list/EditActivityDrawer'
import { ActivityProps } from '@/types/activities'

interface StatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: ActivityProps
}

const StatusObj: StatusType = {
  active: 'info',
  suspended: 'error',
  completed: 'success',
}

const RowOptions = ({ patronID, data }: { patronID: string; data: ActivityProps }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [editActivityOpen, setEditActivityOpen] = useState<boolean>(false)

  const toggleEditActivityDrawer = () => setEditActivityOpen(!editActivityOpen)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    MySwal.fire({
      title: 'Delete Activity',
      text: 'Are you sure you would like to delete this Activity?',
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
        dispatch(deleteActivity({ id: patronID, imgUrls: data.imgs }))

        MySwal.fire({
          icon: 'warning',
          title: 'Delete!',
          text: 'Deleting Activity...',
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
    toggleEditActivityDrawer()
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
            href={`/admin/activities/${patronID}`}
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
        <SidebarEditActivity
          open={editActivityOpen}
          toggle={toggleEditActivityDrawer}
          activityData={data}
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
                href={`/admin/activities/${row.id}`}
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

const DashActivities = () => {
  // ** State
  const [addNewActivityOpen, setAddNewActivityOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.activities)

  const { activities, pending } = store

  useEffect(() => {
    // Fetch Activities
    if (activities.length === 0) {
      dispatch(getActivities())
    }
  }, [dispatch, activities.length])

  const toggleAddActivityDrawer = () => setAddNewActivityOpen(!addNewActivityOpen)

  if (pending) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <>
      <Grid container spacing={6} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={12}>
          <Card>
            <CardHeader title="List of Activities" />
            <Divider sx={{ m: '0 !important' }} />
            <TableHeader toggle={toggleAddActivityDrawer} />
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={activities}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Card>
        </Grid>

        {/* Create Modal */}
        <SidebarAddAcitivity open={addNewActivityOpen} toggle={toggleAddActivityDrawer} />
      </Grid>
    </>
  )
}

export default DashActivities
