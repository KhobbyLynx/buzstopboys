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
            const accessToken = await user.getIdToken();

            const userData = {
              id: user.uid,
              lastSignInTime: user.metadata.lastSignInTime,
              accessToken,
              refreshToken: user.refreshToken,
            };

            resolve(userData);
          } catch (error) {
            console.error("Error getting access token:", error);
            reject(error);
          }
        } else {
          resolve(null); // No user signed in
        }
      },
      (error) => {
        console.error("Error fetching user data:", error);
        reject(error);
      }
    );
  });
};


// ** Format Amount
export function formatAmount(amount: number ): string {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

// ** Format Date & Time
export function formatDate(isoDate: string, locale: string = 'en-US'): string {
  const date = new Date(isoDate);

  return date.toLocaleString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // 24-hour format
      timeZone: 'UTC', // Ensure consistent output
  }).replace(',', '');
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
export function splitEmail(email : String | null): String | undefined {
  if(!email) return ""
  const atIndex = email.indexOf('@') // Find the index of the @ symbol
  if (atIndex === -1) {
    // If no @ symbol is found, return null
    return ""
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
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  // Ensure the color is always 6 digits long by padding with leading zeros if necessary
  return `#${randomColor.padStart(6, '0')}`;
}