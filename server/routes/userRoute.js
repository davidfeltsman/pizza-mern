import express from 'express';
import { UserCtrl } from '../controllers/userController.js';

export const router = express.Router();

router.get('/', UserCtrl.index);
router.post('/:id', UserCtrl.show);
