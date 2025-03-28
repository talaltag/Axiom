import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://nolantapps:oCOt2NNcEQKUZcuj@impacto-cluster.s20zbjj.mongodb.net/axiom?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true, // Changed to true to allow buffering
      serverSelectionTimeoutMS: 30000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB Connected Successfully");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
}

export default dbConnect;
