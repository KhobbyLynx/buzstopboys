'use client'
// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, useMemo } from 'react'

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

// ** Icon Imports
import Icon from '@/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Utils Import
import { formatDate } from '@/utils/utils'

// ** Custom Components Imports
import CustomChip from '@/components/mui/chip'

// ** Actions Imports
import { deleteMessage, getMessages, patchMessage } from '@/store/messages'

// ** Third Party Imports
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Types
import { MessagesProps } from '@/types/messages'
import { AppDispatch, RootState } from '@/store'

// ** Custom Table Components Imports
import TableHeader from '@/view/admin/messages/list/TableHeader'
import { CircularProgress, Tooltip } from '@mui/material'

// ** Sidebar Components
import SidebarSendMessage from '@/view/admin/messages/list/SendMessageDrawer'
import SidebarEditMessage from '@/view/admin/messages/list/EditMessageDrawer'

interface CellType {
  row: MessagesProps
}

const messageStatus: Record<
  string,
  'default' | 'warning' | 'success' | 'info' | 'primary' | 'secondary' | 'error'
> = {
  sent: 'warning',
  read: 'success',
  delivered: 'primary',
}

const messageSource: Record<
  string,
  'default' | 'warning' | 'success' | 'info' | 'primary' | 'secondary' | 'error'
> = {
  contact: 'warning',
  inbox: 'success',
}

const messageSender: Record<
  string,
  'default' | 'warning' | 'success' | 'info' | 'primary' | 'secondary' | 'error'
> = {
  unregistered: 'error',
  patron: 'info',
  admin: 'success',
}

const RowOptions = ({ patronId, data }: { patronId: string; data: MessagesProps }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [editMessageOpen, setEditMessageOpen] = useState<boolean>(false)

  const toggleEditMessageDrawer = () => setEditMessageOpen(!editMessageOpen)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    MySwal.fire({
      title: 'Delete Message',
      text: 'Are you sure you would like to delete this Message?',
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
        dispatch(deleteMessage(patronId))

        MySwal.fire({
          icon: 'warning',
          title: 'Delete!',
          text: 'Deleting Message...',
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
    toggleEditMessageDrawer()
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
            href={`/admin/messages/${patronId}`}
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
        <SidebarEditMessage
          open={editMessageOpen}
          toggle={toggleEditMessageDrawer}
          messageData={data}
        />
      </>
    </>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 160,
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
                href={`/admin/messages/${row.id}`}
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textTransform: 'capitalize',
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
    flex: 0.12,
    minWidth: 146,
    field: 'senderStatus',
    headerName: 'Sender Auth Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={row.senderStatus}
          color={messageSender[row.senderStatus]}
          sx={{ textAlign: 'center' }}
        />
      )
    },
  },
  {
    flex: 0.25,
    minWidth: 260,
    headerName: 'Message',
    field: 'content',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title={row.content} placement="top-start">
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
            {row.content}
          </Typography>
        </Tooltip>
      )
    },
  },
  {
    flex: 0.1,
    minWidth: 126,
    field: 'source',
    headerName: 'Source',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={row.source}
          color={messageSource[row.source]}
          sx={{ textAlign: 'center' }}
        />
      )
    },
  },
  {
    flex: 0.1,
    minWidth: 126,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={row.status}
          color={messageStatus[row.status]}
          sx={{ textAlign: 'center' }}
        />
      )
    },
  },

  {
    flex: 0.1,
    minWidth: 160,
    field: 'createdAt',
    headerName: 'Time',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {formatDate(row.createdAt).periodFromNow}
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
      return <RowOptions patronId={row.id} data={row} />
    },
  },
]

const DashInbox = () => {
  // ** State
  const [sendMessageOpen, setSendMessageOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [patchedIds, setPatchedIds] = useState<Set<string>>(new Set()) // Track patched message IDs

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { messages, sending, pending, auth } = useSelector((state: RootState) => ({
    messages: state.messages.messages,
    sending: state.messages.sending,
    pending: state.messages.pending,
    auth: state.auth.data,
  }))

  const userId = auth?.id || ''

  // Cache "sent" messages for faster lookups
  const pendingMessages = useMemo(() => {
    return messages.filter((m) => m.status === 'sent')
  }, [messages])

  // Helper function to chunk and patch messages
  const patchMessagesInChunks = useCallback(
    async (data: Array<{ id: string; type: string; readerId: string }>, chunkSize = 50) => {
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize)
        await Promise.all(chunk.map((item) => dispatch(patchMessage(item))))
      }
    },
    [dispatch]
  )

  // Fetch Messages
  const fetchMessages = useCallback(
    async (page: number, limit: number) => {
      if (pending) return

      try {
        // Fetch new messages
        if (messages.length === 0 || refreshing) {
          await dispatch(getMessages({}))
        }

        // Identify new messages that need patching
        const newMessagesToPatch = pendingMessages.filter((m) => !patchedIds.has(m.id))

        if (newMessagesToPatch.length > 0) {
          const messagesToPatch = newMessagesToPatch.map((m) => ({
            id: m.id,
            type: 'delivered',
            readerId: userId,
          }))

          // Patch in chunks
          await patchMessagesInChunks(messagesToPatch, 50)

          // Mark as patched
          setPatchedIds((prev) => {
            const updatedIds = new Set(prev)
            newMessagesToPatch.forEach((m) => updatedIds.add(m.id))
            return updatedIds
          })
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    },
    [
      dispatch,
      pending,
      patchedIds,
      patchMessagesInChunks,
      pendingMessages,
      userId,
      messages.length,
      refreshing,
    ]
  )

  // Manual refresh handler
  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await fetchMessages(paginationModel.page, paginationModel.pageSize)
    } finally {
      setRefreshing(false)
    }
  }

  // Handle Pagination Change
  const handlePaginationChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel)
    fetchMessages(newModel.page, newModel.pageSize)
  }

  // Initial fetch only once
  useEffect(() => {
    fetchMessages(paginationModel.page, paginationModel.pageSize)
  }, [fetchMessages, paginationModel]) // Empty dependency array prevents looping

  const toggleSendMessageDrawer = () => setSendMessageOpen(!sendMessageOpen)

  if (pending && !refreshing) {
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
            <CardHeader title="List of Messages" />
            <Divider sx={{ m: '0 !important' }} />
            <TableHeader
              toggle={toggleSendMessageDrawer}
              refreshing={refreshing}
              handleRefresh={handleRefresh}
              sending={sending}
            />
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={messages}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={handlePaginationChange}
            />
          </Card>
        </Grid>

        {/* Create Modal */}
        <SidebarSendMessage open={sendMessageOpen} toggle={toggleSendMessageDrawer} />
      </Grid>
    </>
  )
}

export default DashInbox
