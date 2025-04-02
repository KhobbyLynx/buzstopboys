'use client'
import { formatAmount } from '@/utils/utils'
import { InboxArrowDownIcon } from '@heroicons/react/24/solid'
import { Button } from '@material-tailwind/react'
import { useState } from 'react'
import { TextField, InputAdornment } from '@mui/material'

import IconifyIcon from '../icon'
import DialogDonateForm from '../dialog/DonateFormDialog'
import SnackbarAlert from '../snackbar'

const DonateCard = ({ amount, id: donationId }: { amount: number | null; id: string }) => {
  const [showFormDialog, setShowFormDialog] = useState<boolean>(false)
  const [openSnackbar, setopenSnackbar] = useState<boolean>(false)
  const [customAmount, setCustomAmount] = useState<string>('')
  const handleOpenDialog = () => setShowFormDialog(!showFormDialog)
  const handleOpenSnackbar = () => setopenSnackbar(!openSnackbar)

  const handleDonate = () => {
    if (!amount && parseInt(customAmount) < 5) {
      return handleOpenSnackbar()
    }

    handleOpenDialog()
  }

  return (
    <div className="mb-6">
      <div className="border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white h-[360px] overflow-hidden">
        <div className="flex flex-col justify-center items-center my-auto h-3/4 p-10 gap-10">
          <InboxArrowDownIcon />
          <h3 className="text-lg font-semibold text-gray-800 uppercase font-serif">
            {!amount ? 'Custom Donate' : 'Donate'}
          </h3>
          {!amount ? (
            <TextField
              label="Enter Amount"
              variant="filled"
              placeholder="eg. 100"
              required
              helperText={
                customAmount && Number(customAmount) <= 4 ? 'Amount must be 5 or more!' : ''
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconifyIcon fontSize="1.25rem" icon="healthicons:ghana" />
                  </InputAdornment>
                ),
              }}
              value={customAmount}
              onChange={(e) => {
                const value = e.target.value
                if (/^\d*$/.test(value)) {
                  setCustomAmount(value)
                }
              }}
            />
          ) : (
            <h3 className="text-lg font-semibold text-blue-800">{formatAmount(amount)}</h3>
          )}
        </div>
        <Button className="w-full rounded-none h-1/4" onClick={handleDonate}>
          Donate Now
        </Button>
      </div>
      <DialogDonateForm
        show={showFormDialog}
        handleClose={handleOpenDialog}
        amount={amount || parseInt(customAmount)}
        donationId={donationId}
        donationType={amount ? 'option' : 'custom'}
      />
      <SnackbarAlert
        open={openSnackbar}
        handleOpen={handleOpenSnackbar}
        color="error"
        variant="filled"
        message="Invalid Amount"
        horizontal="right"
      />
    </div>
  )
}

export default DonateCard
