import mongoose from 'mongoose'

declare global {
  var mongooseConnection: boolean | undefined
}

async function connectMongoDB(): Promise<void> {
  if (global.mongooseConnection) {
    console.log('Using existing MongoDB connection')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string)

    global.mongooseConnection = true
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw new Error('Failed to connect to MongoDB')
  }
}

export default connectMongoDB
