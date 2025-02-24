import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log('Trying to connect db.')
    const conn = await mongoose.connect("mongodb://localhost:27017/test_db");
    console.log(`Connected to database : ${conn.connection.db.databaseName}`)
  } catch (error) {
    console.log(error);
    console.log(`Error in MongoDB ${error}`);
  }
};
