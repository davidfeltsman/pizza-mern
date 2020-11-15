import mongoose from 'mongoose';
import { UserModel } from '../models/UserModel.js';

const isValidObjectId = mongoose.Types.ObjectId.isValid;

class UserController {
  async index(req, res) {
    try {
      const limit = parseInt(req.query.limit, 10);
      const skip = parseInt(req.query.page * limit, 10);
      const users = await UserModel.find({}).skip(skip).limit(limit);
      const toalUsersCount = await UserModel.countDocuments();
      res.json({
        status: 'success',
        data: {
          users,
          totalUsers: toalUsersCount,
        },
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

  async remove(req, res) {
    try {
      const senderId = req.user._id;
      const senderRole = req.user.role;
      const userId = req.params.id;
      if (!isValidObjectId(userId)) {
        res.status(400).json({
          status: 'error',
          message: 'Not valid userId',
        });
        return;
      }
      if (senderId == userId || senderRole === 'admin') {
        const user = await UserModel.findByIdAndRemove(userId).exec();
        res.status(200).json({
          status: 'success',
          message: `Пользователь ${user.username} успешно удален`,
        });
        return;
      } else {
        res.status(403).json({
          status: 'error',
          message: 'Недостаточно прав',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: JSON.stringify(error),
      });
    }
  }
}

export const UserCtrl = new UserController();
