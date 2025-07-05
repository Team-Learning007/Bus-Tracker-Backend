import logger from '#utils/logger/winston-logger.js';
import mongoose from 'mongoose';

const dbConnect = async () => {
  const MONGODB_URI = process.env.MONGODB_URI; // 'mongodb://localhost:27017/';
  if (!MONGODB_URI) {
    throw new Error('mongo db uri required');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    logger.info(' ............... Successfully mongodb connected ........');
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default dbConnect;
