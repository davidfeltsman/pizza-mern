import express from 'express';
import { AuthCtrl } from '../controllers/authController.js';
import { registerValidations } from '../validations/register.js';

export const router = express.Router();

router.post('/login', registerValidations, AuthCtrl.login);
router.post('/register', registerValidations, AuthCtrl.register);
router.post('/check', AuthCtrl.checkUser);
router.get('/verify', AuthCtrl.verify);
