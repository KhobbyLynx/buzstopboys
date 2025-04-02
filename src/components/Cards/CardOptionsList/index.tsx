import React, { MouseEvent, useState } from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { deleteDonationOption } from '@/store/slides/donations'

// ** Icon Imports
import Icon from '@/components/icon'

import EditDonationOptionDrawer from '@/view/admin/donations/list/EditDonationOptionDrawer'
import AddDonationOptionDrawer from '@/view/admin/donations/list/AddDonationOptionDrawer'
import { formatAmount } from '@/utils/utils'
import { DonationOptionsProps, DonationOptionType, EditDonationOptionType } from '@/types/donations'

const MySwal = withReactContent(Swal)

export default function CardOptionaList({ data }: { data: DonationOptionsProps[] }) {
  const [addNewDonationOption, setAddNewDonationOption] = useState<boolean>(false)

  const toggleAddNewDonationOption = () => setAddNewDonationOption(!addNewDonationOption)

  const RowOptions = ({ patronID, data }: { patronID: string; data: EditDonationOptionType }) => {
    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [editOptionOpen, setEditOptionOpen] = useState<boolean>(false)

    const toggleEditOptionDrawer = () => setEditOptionOpen(!editOptionOpen)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    const handleDelete = () => {
      MySwal.fire({
        title: 'Delete Donation Option',
        text: 'Are you sure you would like to delete this Option?',
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
          dispatch(deleteDonationOption(patronID))

          MySwal.fire({
            icon: 'success',
            title: 'Delete!',
            text: 'Deleting Donation Option...',
            customClass: {
              confirmButton:
                'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
            },
          })
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          MySwal.fire({
            title: 'Cancelled',
            text: 'Deletion Cancelled!!',
            icon: 'error',
            customClass: {
              confirmButton:
                'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
            },
          })
        }
      })

      handleRowOptionsClose()
    }

    const handleEdit = () => {
      toggleEditOptionDrawer()
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
          <EditDonationOptionDrawer
            open={editOptionOpen}
            toggle={toggleEditOptionDrawer}
            OptionData={data}
          />
        </>
      </>
    )
  }

  return (
    <Paper sx={{ p: 2, mb: 4, borderRadius: 2, boxShadow: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Donation Options
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={toggleAddNewDonationOption}
        >
          Add New Option
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Amount Raised</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.amount ? formatAmount(Number(data.amount)) : 'custom'}</TableCell>
              <TableCell>{formatAmount(Number(data.amountRaised))}</TableCell>
              <TableCell>
                <RowOptions patronID={data.id} data={data} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <>
        {/* Add Modal */}
        <AddDonationOptionDrawer open={addNewDonationOption} toggle={toggleAddNewDonationOption} />
      </>
    </Paper>
  )
}
