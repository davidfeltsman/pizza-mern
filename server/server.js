import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import './core/db.js';
import passport from 'passport';
import { router as authRouter } from './routes/authRoute.js';
import { router as userRouter } from './routes/userRoute.js';
import { jwtConfig } from './utils/passport.js';

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cors());
jwtConfig(passport);

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log('server start');
});
