import mongoose from 'mongoose';
import { UserModel } from '../models/UserModel.js';

const isValidObjectId = mongoose.Types.ObjectId.isValid;

class UserController {
  async index(req, res) {
    try {
      const users = await UserModel.find({}).exec();
      res.json({
        status: 'success',
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: JSON.stringify(error),
      });
    }
  }

  async show(req, res) {
    try {
      const userId = req.params.id;
      if (!isValidObjectId(userId)) {
        res.status(400).json({
          status: 'error',
          message: 'Not valid userId',
        });
        return;
      }

      const user = await UserModel.findById(userId).exec();
      if (!user) {
        res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
        return;
      }

      res.json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: JSON.stringify(error),
      });
    }
  }
}

export const UserCtrl = new UserController();
