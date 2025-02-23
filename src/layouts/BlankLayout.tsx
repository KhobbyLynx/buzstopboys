import React from 'react'
import { Box } from '@mui/material'

const BlankLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Box component="main">{children}</Box>
}

export default BlankLayout
