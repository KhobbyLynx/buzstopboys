// ** React Imports
import { forwardRef, Ref } from 'react'

// ** MUI Imports
import MuiAvatar from '@mui/material/Avatar'
import { lighten } from '@mui/material/styles'

// ** Types
import { CustomAvatarProps } from './types'

// ** Types
interface UseBgColorType {
  [key: string]: {
    color: string
    backgroundColor: string
  }
}

const Avatar = forwardRef((props: CustomAvatarProps, ref: Ref<any>) => {
  // ** Props
  const { sx, src, skin, color } = props

  // ** Hook

  // const getAvatarStyles = (skin: 'filled' | 'light' | 'light-static' | undefined) => {
  //   let avatarStyles

  //   if (skin === 'light') {
  //     avatarStyles = { ...bgColors[`${skinColor}Light`] }
  //   } else if (skin === 'light-static') {
  //     avatarStyles = {
  //       color: bgColors[`${skinColor}Light`].color,
  //       backgroundColor: lighten(theme.palette[skinColor].main, 0.88)
  //     }
  //   } else {
  //     avatarStyles = { ...bgColors[`${skinColor}Filled`] }
  //   }

  //   return avatarStyles
  // }

  // const colors: UseBgColorType = {
  //   primary: getAvatarStyles(skin, 'primary'),
  //   secondary: getAvatarStyles(skin, 'secondary'),
  //   success: getAvatarStyles(skin, 'success'),
  //   error: getAvatarStyles(skin, 'error'),
  //   warning: getAvatarStyles(skin, 'warning'),
  //   info: getAvatarStyles(skin, 'info')
  // }

  return <MuiAvatar ref={ref} {...props} />
})

Avatar.defaultProps = {
  skin: 'filled',
  color: 'primary'
}

Avatar.displayName = "Avatar"
export default Avatar
