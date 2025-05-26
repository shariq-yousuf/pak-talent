import mongoose from 'mongoose'

export const connectToDB = async () => {
  if (mongoose.connection.readyState === 1) {
    // Connection is already established
    return
  }

  console.log('Connecting to MongoDB...')

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error?.message)
  }
}
