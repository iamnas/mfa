import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string,{
      dbName: 'mfa',
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.log(`Database connection error: ${error}`);
    process.exit(1);
  }
};

export default dbConnect;