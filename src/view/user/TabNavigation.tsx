'use client'

import { Box } from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import Tab from '@mui/material/Tab'
import { useRouter, usePathname } from 'next/navigation'
import { SyntheticEvent, useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

const tabs = [
  { value: 'profile', label: 'Profile', icon: 'tabler:user-check' },
  { value: 'inbox', label: 'Inbox', icon: 'tabler:layout-grid' },
  { value: 'donations', label: 'Donations', icon: 'tabler:link' },
  { value: 'settings', label: 'Settings', icon: 'tabler:settings' },
]

export default function TabNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  // Extract current tab from the pathname
  const currentTab = pathname.split('/').pop() || 'profile'
  const [value, setValue] = useState(currentTab)

  useEffect(() => {
    setValue(currentTab)
  }, [pathname, currentTab])

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
    router.push(`/user/${newValue}`)
  }

  const useBreakpoint = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false)

    useEffect(() => {
      const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 768)
      checkScreenSize()
      window.addEventListener('resize', checkScreenSize)
      return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    return isSmallScreen
  }

  const hideText = useBreakpoint()

  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        aria-label="user navigation tabs"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ justifyContent: 'center', display: 'flex', width: '100%' }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon fontSize="1.125rem" icon={tab.icon} />
                {!hideText && (
                  <Box component="span" sx={{ ml: 1 }}>
                    {tab.label}
                  </Box>
                )}
              </Box>
            }
          />
        ))}
      </TabList>
    </TabContext>
  )
}
