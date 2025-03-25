// import React from 'react'

// const UserDonations = () => {
//   return <div>UserDonations</div>
// }

// export default UserDonations

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
import { deleteTransaction, getUserTransactions } from '@/store/slides/transactions'

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
      return (
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
          }}
        >
          <Icon icon="tabler:eye" width={20} height={20} fontSize={20} />
        </IconButton>
      )
    },
  },
]

const UserDonations = () => {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { userTransactionsData, fetchingUserTransactions, auth } = useSelector(
    (state: RootState) => ({
      userTransactionsData: state.transactions.userTransactionsData,
      fetchingUserTransactions: state.transactions.fetchingUserTransactions,
      auth: state.auth.data,
    })
  )

  // Handle Pagination Change
  const handlePaginationChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel)
    if (auth) {
      getUserTransactions({ id: auth.id, query: { page: newModel.page, limit: newModel.pageSize } })
    }
  }

  // Initial fetch only once
  useEffect(() => {
    if (auth) {
      getUserTransactions({ id: auth.id })
    }
  }, [paginationModel, auth])

  useEffect(() => {
    // Fetch Donation Transactions
    if (userTransactionsData.length === 0) {
      if (auth) {
        dispatch(getUserTransactions({ id: auth.id }))
      }
    }
  }, [dispatch, userTransactionsData.length, auth])

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
        {fetchingUserTransactions ? (
          <Box
            sx={{
              mt: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <Grid item xs={12} lg={12}>
            <Card>
              {userTransactionsData.length > 0 ? (
                <>
                  <CardHeader title="List of Donation Transactions" />
                  <Divider sx={{ m: '0 !important' }} />
                  <DataGrid
                    autoHeight
                    rowHeight={62}
                    rows={userTransactionsData}
                    columns={columns}
                    disableRowSelectionOnClick
                    pageSizeOptions={[10, 25, 50]}
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationChange}
                  />
                </>
              ) : (
                <Box className="flex flex-col items-center justify-center p-6 text-center shadow-md w-full mx-auto">
                  <Icon
                    icon="mdi:alert-circle-outline"
                    className="text-gray-400"
                    width={40}
                    height={40}
                  />
                  <p className="text-lg font-semibold text-gray-600 mt-2">No donations made yet</p>
                  <p className="text-sm text-gray-500">
                    You can donate to any cause{' '}
                    <Link href="/donate">
                      <span className="text-light-blue-700">
                        <em>here</em>
                      </span>
                    </Link>
                    .
                  </p>
                </Box>
              )}
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default UserDonations
