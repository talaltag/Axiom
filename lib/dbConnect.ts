
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  try {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10
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
