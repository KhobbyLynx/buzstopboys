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
import MuiAvatar from '@mui/material/Avatar'

// ** Icon Imports
import Icon from '@/components/icon'

// ** Store Imports
// import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from '@/components/mui/chip'

// ** Utils Import
import { getInitials } from '@/utils/utils'

// ** Actions Imports
// import { fetchUsers, deleteUser } from 'src/store/apps/user'

// ** Third Party Imports
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Types 
type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'light'

type UserType = {
  userId: string
  numberId: string
  id: string
  username: string
  firstname: string
  lastname: string
  address: string
  avatar: string
  email: string
  contact: string
  onlineStatus: Boolean
  verified: string
  role: string
  avatarColor?: ThemeColor
  // tokens: {
  //   refreshToken: string
  //   accessToken: string
  //   expirationTime: string
  // }
  // timeStamp: {
  //   createdAt: Date
  //   lastLogin: Date
  // }
}

// import { RootState, AppDispatch } from 'src/store'

// ** Custom Table Components Imports
import TableHeader from '@/view/admin/users/list/TableHeader'
import axiosRequest from '@/utils/axiosRequest'
import SidebarAddPatron from '@/view/admin/users/list/AddPatronDrawer'

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
  row: UserType
}

// ** renders client column
const userRoleObj: UserRoleType = {
  admin: { icon: 'tabler:device-laptop', color: 'info' },
  author: { icon: 'ic:outline-book', color: 'success' },
  editor: { icon: 'tabler:edit', color: 'secondary' },
  agent: { icon: 'mdi:face-agent', color: 'primary' },
  patron: { icon: 'tabler:user', color: 'warning' }
}

const userStatusObj: UserStatusType = {
  Online: 'info',
  Offline: 'light'
}

const verificationStatusObj: verificationStatusType = {
  Verified: 'success',
  Unverified: 'warning'
}

// ** renders client column
const renderClient = (row: UserType) => {
  if (row.avatar) {
    return <MuiAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <MuiAvatar
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.username ? row.username : 'X X')}
      </MuiAvatar>
    )
  }
}

const RowOptions = ({ patronID }: { patronID: number | string }) => {
  // ** Hooks
  // const dispatch = useDispatch<AppDispatch>()

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
        // Run suspend action
        // dispatch(deleteUser(userId))
        
        MySwal.fire({
          icon: 'success',
          title: 'Suspend!',
          text: 'Account has been Suspended.',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Suspension Cancelled!!',
          icon: 'error',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          },
        });
      }
    });
  
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
        // dispatch(deleteUser(userId))
        
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Account has been deactivated.',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Deactivation Cancelled!!',
          icon: 'error',
          customClass: {
            confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          },
        });
      }
    });
  
    handleRowOptionsClose();
  };
  

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href={`/admin/patrons/${patronID}`}
          onClick={handleRowOptionsClose}
        >
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleSuspend} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Suspend
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
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
                '&:hover': { color: 'primary.main' }
              }}
            >
              {username}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 170,
    headerName: 'Role',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MuiAvatar
             sx={{ mr: 4, width: 30, height: 30, backgroundColor: `${row.role === 'admin'? 'success' : 'info'}.main` }}
          >
            <Icon icon={userRoleObj[row.role].icon} />
          </MuiAvatar>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.role}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 260,
    headerName: 'Full Name',
    field: 'firstname',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {`${row.firstname} ${row.lastname}`}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Contact',
    field: 'contact',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.contact ?? '-'}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 240,
    field: 'address',
    headerName: 'Address',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.address?? '-'}
        </Typography>
      )
    }
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
          skin='light'
          size='small'
          label={row.verified? 'Verified' : 'Unverified'}
          color={verificationStatusObj[row.verified ? 'Verified' : 'Unverified']}
          sx={{ textTransform: 'capitalize', textAlign: 'center' }}
        />
      )
    }
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
            skin='light'
            size='small'
            label={row.onlineStatus ? 'Online' : 'Offline'}
            color={userStatusObj[row.onlineStatus ? 'Online' : 'Offline']}
            sx={{ textTransform: 'capitalize' }}
          />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => {
      return (
          <RowOptions patronID={row.id} 
        />
      )}
  }
]

const UserList = () => {
  // ** State
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const [patrons, setPatrons] = useState([])

  useEffect(() => {
    const fetchPatrons = async () => {
      const patrons = await axiosRequest.get('/patrons')

      setPatrons(patrons.data)
      console.log('patrons', patrons)
    }

    fetchPatrons()
  }, [])

  // ** Hooks
  // const dispatch = useDispatch<AppDispatch>()
  // const store = useSelector((state: RootState) => state.user)

  // useEffect(() => {
  //   dispatch(
  //     fetchUsers({
  //       role,
  //       onlineStatus,
  //       q: value,
  //       verified
  //     })
  //   )
  // }, [dispatch, verified, , role, onlineStatus, value])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='List of Patrons' />
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={patrons}
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
