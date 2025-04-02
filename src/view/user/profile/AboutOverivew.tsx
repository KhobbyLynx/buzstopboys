// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import { Icon } from '@iconify/react'

// ** Types
export type ProfileTabCommonType = {
  icon: string
  value: string
  property: string
}

// ** Next imports
import Link from 'next/link'

export type ProfileTabSocialsType = {
  icon: string
  link?: string
}

export type ProfileTeamsType = ProfileTabCommonType

interface Props {
  about: ProfileTabCommonType[]
  contacts: ProfileTabCommonType[]
  socials: ProfileTabSocialsType[]
  overview: ProfileTabCommonType[]
}

const renderList = (arr: ProfileTabCommonType[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' },
          }}
        >
          <Box sx={{ display: 'flex', mr: 2 }}>
            <Icon fontSize="1.25rem" icon={item.icon} />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography
              sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}
            >
              {item.property}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{item?.value}</Typography>
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}

const renderSocials = (arr: ProfileTabSocialsType[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          component={Link}
          href={item.link || ''}
          sx={{
            width: '100%',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' },
          }}
        >
          <Box sx={{ mr: 2 }}>
            <Icon fontSize="1.5rem" icon={item.icon} />
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}

const AboutOverivew = (props: Props) => {
  const { about, contacts, overview, socials } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card className="rounded-xl bg-white p-6 shadow-lg outline outline-black/5">
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="body2"
                sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}
              >
                About
              </Typography>
              {renderList(about)}
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="body2"
                sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}
              >
                Contacts
              </Typography>
              {renderList(contacts)}
            </Box>
            <Box className="mb-6">
              <Typography
                variant="body2"
                sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}
              >
                Socials
              </Typography>
              <Box className="flex w-full">{renderSocials(socials)}</Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card className="rounded-xl bg-white p-6 shadow-lg outline outline-black/5">
          <CardContent>
            <div>
              <Typography
                variant="body2"
                sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}
              >
                Overview
              </Typography>
              {renderList(overview)}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverivew
