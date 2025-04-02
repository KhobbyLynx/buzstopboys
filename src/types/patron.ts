export type PatronType = {
  email: string
  username: string
  firstname?: string
  lastname?: string
  avatar?: string
  contact?: number | undefined
  suspended?: boolean
}

export type PatronDatabaseType = {
  id: string
  username: string
  fullname?: string
  firstname?: string
  lastname?: string
  email: string
  contact?: string | null
  address?: string
  role: string
  verified: boolean
  onlineStatus: boolean
  avatar?: string
  createdAt?: string
  updatedAt?: string
  lastSignInTime?: string
  suspended?: boolean
}

export type PatronWebType = {
  id: string // Campaign ID
  fullname?: string
  firstname?: string
  lastname?: string
  username?: string
  email: string
  role: string
  address?: string
  contact?: string
  avatar?: string
  suspended?: boolean
  onlineStatus: boolean
  verified: boolean
  type?: string
  socials?: { [key: string]: string | undefined }
  timestamps: {
    createdAt: string // ISO date string
    lastSignInTime?: string
  }
  tokens: {
    refreshToken: string
    accessToken: string
  }
}

export type PatronProfileType = {
  fullname?: string
  firstname?: string
  lastname?: string
  username?: string
  email?: string
  avatar?: string
  address?: string
  contact?: string
  socials?: { [key: string]: string | undefined }
}

export type PatronAdminType = {
  id: string // Campaign ID
  fullname?: string
  username?: string
  email: string
  role: string
  address?: string
  contact?: string
  avatar?: string
  suspended?: boolean
  onlineStatus: boolean
  verified: boolean
  timestamps: {
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    lastSignInTime: string
  }
}
