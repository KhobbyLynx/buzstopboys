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
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { CircularProgress, Tooltip } from '@mui/material'

// ** Icon Imports
import Icon from '@/components/icon'

// ** Store Imports
import { AppDispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from '@/components/mui/chip'

// ** Utils Import
import { formatAmount, formatDate } from '@/utils/utils'

// ** Actions Imports
import { deleteTransaction, getTransactions } from '@/store/slides/transactions'

// ** Third Party Imports
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Custom Table Components Imports
import TableHeader from '@/view/admin/transactions/list/TableHeader'

// ** Sidebar Components
// import SidebarAddDonationTransaction from '@/view/admin/transactions/list/AddDonationTransactionDrawer'
// import SidebarEditDonationTransaction from '@/view/admin/transactions/list/EditDonationTransactionDrawer'

// ** Types
import { TRANSACTIONSTYPE } from '@/types/transactions'
type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

interface StatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: TRANSACTIONSTYPE
}

const StatusObj: StatusType = {
  pending: 'info',
  cancelled: 'error',
  success: 'success',
}

const TypeObj: Record<string, ThemeColor> = {
  custom: 'info',
  option: 'warning',
  campaign: 'success',
  event: 'primary',
}

const ChannelsObj = {
  mobile_money: 'Mobile Money',
  card: 'Card',
  bank_transfer: 'Bank Transfer',
}

const RowOptions = ({ userId, data }: { userId: string; data: TRANSACTIONSTYPE }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  //   const [editTransactionOpen, setEditTransactionOpen] = useState<boolean>(false)

  //   const toggleEditTransactionDrawer = () => setEditTransactionOpen(!editTransactionOpen)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    MySwal.fire({
      title: 'Delete Transaction',
      text: 'Are you sure you would like to delete Transaction?',
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
        dispatch(deleteTransaction(userId))

        MySwal.fire({
          icon: 'warning',
          title: 'Delete!',
          text: 'Deleting Transaction...',
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

  //   const handleEdit = () => {
  //     toggleEditTransactionDrawer()
  //     handleRowOptionsClose()
  //   }

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
            href={`/admin/transactions/${userId}`}
            onClick={handleRowOptionsClose}
          >
            <Icon icon="tabler:eye" fontSize={20} />
            View
          </MenuItem>
          {/* <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="uil:edit" fontSize={20} />
            Edit
          </MenuItem> */}
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:trash" fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
      </>
      <>
        {/* Edit Modal */}
        {/* <SidebarEditDonationTransaction
          open={editTransactionOpen}
          toggle={toggleEditTransactionDrawer}
          TransactionData={data}
        /> */}
      </>
    </>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 260,
    field: 'reference',
    headerName: 'Reference',
    renderCell: ({ row }: CellType) => {
      const { reference, id } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Tooltip title={row.reference} placement="top-start">
              <Typography
                noWrap
                component={Link}
                href={`/admin/transactions/${row.id}`}
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
                {reference}
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
    headerName: 'Email',
    field: 'email',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title={row.email} placement="top-start">
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
            {row.email}
          </Typography>
        </Tooltip>
      )
    },
  },
  {
    flex: 0.15,
    minWidth: 180,
    headerName: 'Amount',
    field: 'amount',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography
          sx={{
            fontWeight: 500,
            color: 'text.secondary',
          }}
        >
          {formatAmount(row.amount)}
        </Typography>
      )
    },
  },
  {
    flex: 0.15,
    minWidth: 136,
    headerName: 'Type',
    field: 'transactionType',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={row.transactionType}
          color={TypeObj[row.transactionType]}
        />
      )
    },
  },
  {
    flex: 0.2,
    minWidth: 180,
    headerName: 'Gateway',
    field: 'channel',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.channel ? ChannelsObj[row.channel] : '-'}
        </Typography>
      )
    },
  },

  {
    flex: 0.15,
    minWidth: 136,
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
    minWidth: 220,
    field: 'createdAt',
    headerName: 'Period',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {`${formatDate(row.createdAt).date} - ${formatDate(row.createdAt).time}`}
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
      return <RowOptions userId={row.id} data={row} />
    },
  },
]

const DashTransactions = () => {
  // ** State
  const [addNewTransactionOpen, setAddNewTransactionOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.transactions)

  const { data, fetchingTransactions } = store

  // Handle Pagination Change
  const handlePaginationChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel)
    getTransactions({ page: newModel.page, limit: newModel.pageSize })
  }

  // Initial fetch only once
  useEffect(() => {
    getTransactions({})
  }, [paginationModel])

  useEffect(() => {
    // Fetch Donation Transactions
    if (data.length === 0) {
      dispatch(getTransactions({}))
    }
  }, [dispatch, data.length])

  const toggleAddTransactionDrawer = () => setAddNewTransactionOpen(!addNewTransactionOpen)

  // if (fetchingTransactions && fetchingOptions) {
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
        {!fetchingTransactions ? (
          <Grid item xs={12} lg={12}>
            <Card>
              <CardHeader title="List of Donation Transactions" />
              <Divider sx={{ m: '0 !important' }} />
              <TableHeader toggle={toggleAddTransactionDrawer} />
              <DataGrid
                autoHeight
                rowHeight={62}
                rows={data}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationChange}
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
        {/* <SidebarAddDonationTransaction
          open={addNewTransactionOpen}
          toggle={toggleAddTransactionDrawer}
        /> */}
      </Grid>
    </>
  )
}

export default DashTransactions
