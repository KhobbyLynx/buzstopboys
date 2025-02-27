// This file component can not be flagged as use client as getAuthenticattedUserData is required to be a server function

// ** UUID
import { v4 as uuidv4 } from 'uuid'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../configs/firebase'

// ** Firebase Logout Func
export const logoutFirebase = async () => {
  try {
    await signOut(auth)
    console.log('Firebase SignOut Successful')
  } catch (error) {
    console.log('Error Logging Out', error)
  }
}

// ** Get User ID from Firebase
export const getUserId = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, return the user ID
          resolve(user.uid)
        } else {
          // No user is signed in
          resolve(null)
        }
      },
      (error) => {
        // Handle any errors that occur
        reject(error)
      }
    )
  })
}

// ** Get Patron Data from Firebase
export const getAuthenticatedUserData = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          try {
            // Fetch access token
            const accessToken = await user.getIdToken()

            const userData = {
              id: user.uid,
              lastSignInTime: user.metadata.lastSignInTime,
              accessToken,
              refreshToken: user.refreshToken,
            }

            resolve(userData)
          } catch (error) {
            console.error('Error getting access token:', error)
            reject(error)
          }
        } else {
          resolve(null) // No user signed in
        }
      },
      (error) => {
        console.error('Error fetching user data:', error)
        reject(error)
      }
    )
  })
}

// ** Format Amount
export function formatAmount(amount: number): string {
  return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

// ** Format Date & Time
// Returns an object with time, date, and period from now
export function formatDate(
  isoDate: string,
  locale: string = 'en-GH'
): { time: string; date: string; periodFromNow: string } {
  const date = new Date(isoDate)
  const now = new Date()

  // Time in 12-hour format with AM/PM
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  })
  const time = timeFormatter.format(date)

  // Date in DD/MM/YYYY format
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const dateFormatted = dateFormatter.format(date)

  // Calculate the difference in milliseconds
  const diff = now.getTime() - date.getTime()

  // Helper function to determine the time ago
  const getTimeAgo = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`
    if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`
  }

  const periodFromNow = getTimeAgo(diff)

  return {
    time,
    date: dateFormatted,
    periodFromNow,
  }
}

// ** Returns initials from string
export const getInitials = (string: string) =>
  string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')

// ** Generate Random ID
export const generateRandomId = () => {
  const uuid = uuidv4()
  return uuid.slice(0, 8).toUpperCase()
}

// ** Generate Random Password
export const generateRandomPassword = () => {
  const uuid = uuidv4()
  const firstFive = uuid.slice(0, 5)
  const lastFive = uuid.slice(5, 10).toUpperCase()

  const password = `${firstFive}@${lastFive}`
  return password
}

// ** getUsername
export function splitEmail(email: string | null): string | undefined {
  if (!email) return ''
  const atIndex = email.indexOf('@') // Find the index of the @ symbol
  if (atIndex === -1) {
    // If no @ symbol is found, return null
    return ''
  }

  const username = email.slice(0, atIndex)
  return username
}

// ** Calculate Percentage
export const calculatePercentage = (total: number, obtained: number) => {
  const percentage = (obtained / total) * 100
  return Number(percentage.toFixed(2))
}

// ** Generate Random Color
export function generateRandomColor() {
  // Generate a random number between 0 and 16777215 (0xFFFFFF in decimal)
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)

  // Ensure the color is always 6 digits long by padding with leading zeros if necessary
  return `#${randomColor.padStart(6, '0')}`
}

// ** Convert Youtube video url to embed url
export function convertToEmbedUrl(youtubeUrl: string): string {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

  // Match the video ID
  const match = youtubeUrl.match(regex)

  // If a video ID is found, construct the embed URL
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`
  }

  // Return an empty if the URL is invalid or no video ID is found
  return ''
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
