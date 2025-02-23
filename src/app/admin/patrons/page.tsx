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

// ** Custom Components Imports
import CustomChip from '@/components/modals/mui/chip'

// ** Utils Import
import { getInitials } from '@/utils/utils'

// ** Actions Imports
import { deleteUser, getPatrons, reinstateUser, suspendUser } from '@/store/users'

// ** Third Party Imports
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Types
import { PatronMDBType } from '@/types/patron'
type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default'

import { RootState, AppDispatch } from '@/store'

// ** Custom Table Components Imports
import TableHeader from '@/view/admin/users/list/TableHeader'
import SidebarAddPatron from '@/view/admin/users/list/AddPatronDrawer'
import { Avatar, CircularProgress } from '@mui/material'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface UserStatusType {
  [key: string]: ThemeColor
}

interface verificationStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: PatronMDBType
}

// ** renders client column
const userRoleObj: UserRoleType = {
  admin: { icon: 'tabler:device-laptop', color: 'info' },
  author: { icon: 'ic:outline-book', color: 'success' },
  editor: { icon: 'tabler:edit', color: 'secondary' },
  agent: { icon: 'mdi:face-agent', color: 'primary' },
  patron: { icon: 'tabler:user', color: 'warning' },
}

const userStatusObj: UserStatusType = {
  Online: 'info',
  Offline: 'default',
}

const verificationStatusObj: verificationStatusType = {
  Verified: 'success',
  Unverified: 'warning',
}

// ** renders client column
const renderClient = (row: PatronMDBType) => {
  if (row.avatar) {
    return <Avatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <Avatar
        sx={{
          mr: 2.5,
          width: 38,
          height: 38,
          fontWeight: 500,
          fontSize: (theme) => theme.typography.body1.fontSize,
        }}
      >
        {getInitials(row.username ? row.username : 'X X')}
      </Avatar>
    )
  }
}

const RowOptions = ({
  patronID,
  suspended,
  username,
}: {
  patronID: string
  suspended: boolean | undefined
  username: string
}) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleSuspend = () => {
    MySwal.fire({
      title: 'Suspend Account',
      text: 'Are you sure you would like to suspend this account?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Suspend it!',
      customClass: {
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2',
      },
      buttonsStyling: false,
    }).then(async function (result) {
      if (result.value) {
        // Run Suspend action
        dispatch(suspendUser({ userId: patronID, username }))

        MySwal.fire({
          icon: 'warning',
          title: 'Suspend!',
          text: 'Suspending Account...',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          },
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Suspension Cancelled!!',
          icon: 'error',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          },
        })
      }
    })

    handleRowOptionsClose()
  }

  const handleReinstate = () => {
    MySwal.fire({
      title: 'Reinstate Account',
      text: 'Are you sure you would like to reinstate this account?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reinstate it!',
      customClass: {
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2',
      },
      buttonsStyling: false,
    }).then(async function (result) {
      if (result.value) {
        // Run Suspend action
        dispatch(reinstateUser({ userId: patronID, username }))

        MySwal.fire({
          icon: 'warning',
          title: 'Reinstate!',
          text: 'Reinstating Account...',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          },
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Reinstatement Cancelled!!',
          icon: 'error',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          },
        })
      }
    })

    handleRowOptionsClose()
  }

  const handleDelete = () => {
    MySwal.fire({
      title: 'Delete Account',
      text: 'Are you sure you would like to deactivate this account?',
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
        dispatch(deleteUser(patronID))

        MySwal.fire({
          icon: 'warning',
          title: 'Delete!',
          text: 'Deactivating Account...',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          },
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Deactivation Cancelled!!',
          icon: 'error',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          },
        })
      }
    })

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
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href={`/admin/patrons/${patronID}`}
          onClick={handleRowOptionsClose}
        >
          <Icon icon="tabler:eye" fontSize={20} />
          View
        </MenuItem>
        {suspended ? (
          <MenuItem onClick={handleReinstate} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="lsicon:play-outline" fontSize={20} />
            Reinstate
          </MenuItem>
        ) : (
          <MenuItem onClick={handleSuspend} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="lsicon:suspend-outline" fontSize={20} />
            Suspend
          </MenuItem>
        )}
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon="tabler:trash" fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 280,
    field: 'username',
    headerName: 'Patron',
    renderCell: ({ row }: CellType) => {
      const { email, username } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href={`/admin/patrons/${row.id}`}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {username}
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    },
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 170,
    headerName: 'Role',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              mr: 4,
              width: 30,
              height: 30,
              backgroundColor: `${row.role === 'admin' ? 'success' : 'info'}.main`,
            }}
          >
            <Icon icon={userRoleObj[row.role].icon} />
          </Avatar>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.role}
          </Typography>
        </Box>
      )
    },
  },
  {
    flex: 0.15,
    minWidth: 260,
    headerName: 'Full Name',
    field: 'firstname',
    renderCell: ({ row }: CellType) => {
      const { firstname, lastname } = row
      return (
        <Typography
          noWrap
          sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}
        >
          {firstname || lastname ? `${firstname} ${lastname}` : '-'}
        </Typography>
      )
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Contact',
    field: 'contact',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.contact ? `0${row.contact}` : '-'}
        </Typography>
      )
    },
  },
  {
    flex: 0.1,
    minWidth: 240,
    field: 'address',
    headerName: 'Address',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.address ?? '-'}
        </Typography>
      )
    },
  },

  {
    flex: 0.1,
    minWidth: 136,
    field: 'verified',
    headerName: 'Verified',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={row.verified ? 'Verified' : 'Unverified'}
          color={verificationStatusObj[row.verified ? 'Verified' : 'Unverified']}
          sx={{ textTransform: 'capitalize', textAlign: 'center' }}
        />
      )
    },
  },

  {
    flex: 0.1,
    minWidth: 120,
    field: 'onlineStatus',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={row.onlineStatus ? 'Online' : 'Offline'}
          color={userStatusObj[row.onlineStatus ? 'Online' : 'Offline']}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => {
      return <RowOptions patronID={row.id} suspended={row.suspended} username={row.username} />
    },
  },
]

const UserList = () => {
  // ** State
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.users)
  const { pending, numberOfUsers, users } = store

  useEffect(() => {
    if (numberOfUsers === 0) {
      dispatch(getPatrons())
    }
  }, [dispatch, numberOfUsers])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  if (pending) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={6.5} sx={{ mt: 1 }}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="List of Patrons" />
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={users}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <SidebarAddPatron open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default UserList
