import mongoose from "mongoose";

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState) {
    return mongoose.connection.asPromise;
  }

  return await mongoose.connect(process.env.MONGODB_URI);
};
