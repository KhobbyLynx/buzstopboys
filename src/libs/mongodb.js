import mongoose from 'mongoose'

const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
			// useFindAndModify: false,
			// useCreateIndex: true
		})
		console.log('MongoDB connected')
	} catch (error) {
		console.error('MongoDB connection error:', error)
	}
}

export default connectMongoDB
