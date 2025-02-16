import { SxProps, Theme } from '@mui/material'

export type CardStatsHorizontalWithDetailsProps = {
    icon: string
    stats: string
    title: string
    subtitle: string
    trendDiff: string
    sx?: SxProps<Theme>
    avatarSize?: number
    // avatarColor?: ThemeColor
    iconSize?: number | string
    trend?: 'positive' | 'negative'
  }