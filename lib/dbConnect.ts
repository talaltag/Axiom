
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please add MongoDB URI to environment variables');
}

let cached: any = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  try {
    const opts = {
      bufferCommands: true,
    };

    const conn = await mongoose.connect(MONGODB_URI, opts);
    cached.conn = conn;
    
    console.log('MongoDB Connected Successfully');
    return conn;
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
}

export default dbConnect;
