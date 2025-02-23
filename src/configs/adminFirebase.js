import admin from 'firebase-admin'

// Ensure Firebase Admin SDK is initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    }),
  })
}

// Get Firebase Auth instance
const auth = admin.auth()

// Function to create user
export const adminCreateFirebaseUser = async (userData) => {
  const { email, password, emailVerified } = userData
  try {
    const response = await auth.createUser({
      email,
      emailVerified,
      password,
    })

    return response
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error creating new user', error)
    }

    throw new Error(error instanceof Error ? error.message : 'An error occurred creating new user')
  }
}
// Function to delete user
export const adminDeleteFirebaseUser = async (uid) => {
  try {
    await auth.deleteUser(uid)

    if (process.env.NODE_ENV === 'development') {
      console.log('Successfully deleted user from Firebase')
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error deleting user from Firebase:', error)
    }

    throw new Error(error instanceof Error ? error.message : 'An error occurred deleting user')
  }
}

// Function to suspend (disable) a user
export const adminSuspendFirebaseUser = async (uid) => {
  try {
    await auth.updateUser(uid, { disabled: true })

    if (process.env.NODE_ENV === 'development') {
      console.log(`User ${uid} has been suspended`)
    }

    return { success: true, message: 'User suspended successfully' }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error suspending user:', error)
    }

    return { success: false, message: error.message }
  }
}

// Function to unsuspend (enable) a user
export const adminReinstateFirebaseUser = async (uid) => {
  try {
    await auth.updateUser(uid, { disabled: false })

    if (process.env.NODE_ENV === 'development') {
      console.log(`User ${uid} has been reinstated`)
    }

    return { success: true, message: 'User reinstated successfully' }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reinstating user:', error)
    }
    return { success: false, message: error.message }
  }
}
