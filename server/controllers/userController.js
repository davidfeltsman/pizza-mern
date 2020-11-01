import validator from 'express-validator';
import mongoose from 'mongoose';
import { UserModel } from '../models/UserModel.js';
import { generateSHA } from '../utils/generateHash.js';
import { mailer } from '../utils/nodemailer.js';
import rand from 'csprng';

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

  async create(req, res) {
    try {
      const errors = validator.validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() });
        return;
      }
      const salt = rand(160, 36);
      const data = {
        email: req.body.email,
        username: req.body.username,
        password: generateSHA(salt + req.body.password),
        salt,
        confirmHash: generateSHA(req.body.username + req.body.email),
      };

      const user = await UserModel.create(data);
      mailer.sendMail({
        from: '"React Pizza" <react-pizza@testmail.com>',
        to: data.email,
        subject: 'Hello ✔',
        text: 'React Pizza panel',
        html: `<p>Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${
          process.env.PORT || 3000
        }/api/users/verify?hash=${data.confirmHash}">по этой ссылке</a></p>`,
      });
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

  async verify(req, res) {
    try {
      const hash = req.query.hash;
      if (!hash) {
        res.status(400).send();
        return;
      }
      let user = await UserModel.findOne({ confirmHash: hash }).exec();
      if (user) {
        user.confirmed = true;
        user.save();
        res.json({
          status: 'success',
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'user not found',
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
