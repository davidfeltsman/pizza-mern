import express from 'express';
import passport from 'passport';
import { UserCtrl } from '../controllers/userController.js';

export const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), UserCtrl.index);
router.post('/:id', passport.authenticate('jwt', { session: false }), UserCtrl.show);
