import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { UserCtrl } from './controllers/userController.js';
import { registerValidations } from './validations/register.js';
import './core/db.js';
import passport from 'passport';

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get('/api/users', UserCtrl.index);
app.get('/api/users/id:id', registerValidations, UserCtrl.show);
app.post('/api/auth/register', registerValidations, UserCtrl.create);
app.get('/api/auth/verify', registerValidations, UserCtrl.verify);
app.get('api/auth/login');

// app.patch('/users', UserCtrl.update);
// app.delete('/users', UserCtrl.delete);

app.listen(3000, () => {
  console.log('server start on 3000');
});
