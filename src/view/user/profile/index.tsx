// ** MUI Components
import Grid from '@mui/material/Grid'

// ** Demo Components
import AboutOverivew from './AboutOverivew'
import AccountForm from './AccountForm'

// ** Types
export type ProfileTabCommonType = {
  icon: string
  value: string
  property: string
}

export type ProfileTabSoicalType = {
  icon: string
  link?: string
}

export type ProfileTabType = {
  about: ProfileTabCommonType[]
  contacts: ProfileTabCommonType[]
  socials: ProfileTabSoicalType[]
  overview: ProfileTabCommonType[]
}

const ProfileTab = ({ data }: { data: ProfileTabType }) => {
  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverivew
          about={data.about}
          contacts={data.contacts}
          overview={data.overview}
          socials={data.socials}
        />
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AccountForm />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null
}

export default ProfileTab
