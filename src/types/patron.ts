export type PatronType = {
    email: string
    username: string
    firstname?: string
    lastname?: string
    avatar?: string
    contact?: number | undefined
    suspended?: boolean
}

export type PatronMDBType = {
    _id: string; // MongoDB ObjectId as a string
    id: string; // Campaign ID
    fullname?: string,
    firstname?: string,
    lastname?: string,
    username: string,
    email: string,
    role: string,
    address?: string,
    contact?: string,
    avatar?: string,
    onlineStatus: boolean,
    suspended?: boolean,
    verified: boolean
    lastSignInTime?: string,
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number; // Version key
}

export type PatronWebType = {
    id: string; // Campaign ID
    fullname?: string,
    firstname?: string,
    lastname?: string,
    username?: string,
    email: string,
    role: string,
    address?: string,
    contact?: string,
    avatar?: string,
    suspended?: boolean,
    onlineStatus: boolean,
    verified: boolean
    timestamps: {
        createdAt: string; // ISO date string
        lastSignInTime?: string,
    }
    tokens: {
        refreshToken: string
        accessToken: string
    }
}

export type PatronAdminType = {
    id: string; // Campaign ID
    fullname?: string,
    username?: string,
    email: string,
    role: string,
    address?: string,
    contact?: string,
    avatar?: string,
    suspended?: boolean,
    onlineStatus: boolean,
    verified: boolean
    timestamps: {
        createdAt: string; // ISO date string
        updatedAt: string; // ISO date string
        lastSignInTime: string,
    }
}