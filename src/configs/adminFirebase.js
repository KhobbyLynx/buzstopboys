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
			auth_provider_x509_cert_url:
				process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
			client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
			universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
		})
	})
}

// Get Firebase Auth instance
const auth = admin.auth()

// Function to delete user
export const adminDeleteFirebaseUser = async (uid) => {
	try {
		await auth.deleteUser(uid)
		console.log('Successfully deleted user from Firebase')
	} catch (error) {
		console.error('Error deleting user from Firebase:', error)
	}
}

// Function to suspend (disable) a user
export const adminSuspendFirebaseUser = async (uid) => {
	try {
		await auth.updateUser(uid, { disabled: true })
		console.log(`User ${uid} has been suspended`)
		return { success: true, message: 'User suspended successfully' }
	} catch (error) {
		console.error('Error suspending user:', error)
		return { success: false, message: error.message }
	}
}

// Function to unsuspend (enable) a user
export const adminReinstateFirebaseUser = async (uid) => {
	try {
		await auth.updateUser(uid, { disabled: false })
		console.log(`User ${uid} has been reinstated`)
		return { success: true, message: 'User reinstated successfully' }
	} catch (error) {
		console.error('Error reinstating user:', error)
		return { success: false, message: error.message }
	}
}
