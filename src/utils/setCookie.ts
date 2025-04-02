import { PatronWebType } from '@/types/patron'
import axios from 'axios'

const NEXT_PUBLIC_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/set-cookie`

export const setCookie = async (name: string, value: PatronWebType) => {
  try {
    const response = await axios.post(NEXT_PUBLIC_BASE_URL, {
      name,
      value: typeof value === 'object' ? JSON.stringify(value) : value,
    })

    const result = response.data

    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('UerData cookie set:', result)
    }

    return result
  } catch (error) {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('Error setting user data cookie:', error)
    }

    throw error
  }
}

export const deleteCookie = async (name: String) => {
  try {
    await axios.post(NEXT_PUBLIC_BASE_URL, {
      name,
      value: '',
      options: {
        expires: new Date(0).toUTCString(), // Set to a past date
      },
    })

    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('User Data Cookie deleted!')
    }
  } catch (error) {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.error('Error deleting cookie:', error)
      throw error
    }
  }
}
