import mongoose from 'mongoose';

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`Connected to Mongo DB Database`);
  }catch(error){
    console.log(`MONGO Connect Error`);
  }
}

export default connectDB;