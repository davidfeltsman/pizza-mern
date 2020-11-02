import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

export { db, mongoose };
