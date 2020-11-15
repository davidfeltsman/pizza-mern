import express from 'express';
import passport from 'passport';
import { UserCtrl } from '../controllers/userController.js';

export const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), UserCtrl.index);
router.get('/:id', passport.authenticate('jwt', { session: false }), UserCtrl.show);
router.delete('/remove/:id', passport.authenticate('jwt', { session: false }), UserCtrl.remove);
