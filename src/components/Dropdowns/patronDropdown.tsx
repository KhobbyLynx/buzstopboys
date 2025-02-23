'use client'

import { useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './src/store'
import { handleLogout } from './src/store/auth'
import { getAuthenticatedUserData, logoutFirebase } from './src/utils/utils'

// ** MUI Imports
import { Box, Menu, Badge, Avatar, Divider, MenuItem, Typography, styled } from '@mui/material'

// ** Icons
import IconifyIcon from './src/components/icon'

// ** Types
import { PatronWebType } from './src/types/patron'
import Link from 'next/link'

const BadgeContent = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}))

const PatronDropdown = ({ patronData }: { patronData: PatronWebType }) => {
  const { avatar, username, role, id } = patronData
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleDropdownOpen = (event: SyntheticEvent) =>
    setAnchorEl(event.currentTarget as HTMLElement)
  const handleDropdownClose = (
    event?: {},
    reason?: 'backdropClick' | 'escapeKeyDown',
    url?: string
  ) => {
    setAnchorEl(null)
  }

  const handleSignout = async () => {
    try {
      if (id) {
        await dispatch(handleLogout(id))
        await logoutFirebase()
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error during signout:', error)
      }
    }

    handleDropdownClose()
  }

  const menuItems = [
    {
      label: 'Admin Dashboard',
      icon: 'material-symbols:dashboard',
      url: '/admin/dashboard',
      condition: role === 'admin',
    },
    { label: 'My Profile', icon: 'tabler:user-check', url: '/user-profile' },
    { label: 'Settings', icon: 'tabler:settings', url: '/account-settings' },
    { label: 'Help', icon: 'tabler:lifebuoy', url: '/help-center' },
    { label: 'FAQ', icon: 'tabler:info-circle', url: '/faq' },
    { label: 'Sign Out', icon: 'tabler:logout', onClick: handleSignout },
  ]

  return (
    <>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContent />}
      >
        <Avatar
          alt={username || 'User'}
          src={avatar || '/images/avatars/avatar-blank.png'}
          sx={{ width: 38, height: 38 }}
        />
      </Badge>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={(event, reason) => handleDropdownClose(event, reason)}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.75 } }}
      >
        {/* User Info */}
        <Box sx={{ py: 2, px: 3, display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={avatar || '/images/avatars/avatar-blank.png'}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
              {username}
            </Typography>
            <Typography variant="body2">{role}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Menu Items */}
        {menuItems.map(
          (item, index) =>
            item.condition !== false && (
              <Box key={index}>
                <MenuItem
                  onClick={() => (item.onClick ? item.onClick() : handleDropdownClose(item.url))}
                >
                  <IconifyIcon icon={item.icon} />
                  &nbsp;{' '}
                  {item.url && typeof item.url === 'string' ? (
                    <Link href={item.url}>{item.label}</Link>
                  ) : (
                    item.label
                  )}
                </MenuItem>
                {item.label === 'Admin Dashboard' && <Divider sx={{ my: 1.5 }} />}
              </Box>
            )
        )}
      </Menu>
    </>
  )
}

export default PatronDropdown
