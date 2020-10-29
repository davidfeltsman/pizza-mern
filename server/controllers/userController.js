import validator from 'express-validator';
import { UserModel } from '../models/UserModel.js';
import { generateMD5 } from '../utils/generateHash.js';
import dotenv from 'dotenv';

dotenv.config();

class UserController {
  async index(req, res) {
    try {
      const users = await UserModel.find({}).exec();
      res.json({
        status: 'success',
        data: users,
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: JSON.stringify(error),
      });
    }
  }

  async create(req, res) {
    try {
      const errors = validator.validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() });
        return;
      }
      const data = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        confirmHash: generateMD5(process.env.SECRET_KEY || Math.random().toString()),
      };

      const user = await UserModel.create(data);

      res.json({
        status: 'success',
        data: user,
      });
    } catch (error) {}
  }
}

export const UserCtrl = new UserController();
