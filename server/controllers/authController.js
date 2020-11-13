import validator from 'express-validator';
import { UserModel } from '../models/UserModel.js';
import { generateSHA } from '../utils/generateHash.js';
import { mailer } from '../utils/nodemailer.js';
import jwt from 'jsonwebtoken';
import rand from 'csprng';

class Auth {
  async login(req, res) {
    try {
      const candidate = await UserModel.findOne({
        $or: [{ email: req.body.email }, { username: req.body.email }],
      });
      if (candidate) {
        const passwordCheck =
          generateSHA(candidate.salt + req.body.password) === candidate.password ? true : false;
        if (passwordCheck) {
          if (candidate.confirmed) {
            const token = jwt.sign(
              {
                _id: candidate._id,
                role: candidate.role,
              },
              process.env.SECRET,
              { expiresIn: '1h' },
            );
            res.status(200).json({
              user: candidate,
              token: `Bearer ${token}`,
            });
          } else {
            res.status(403).json({
              status: 'error',
              message:
                'Email не подтвержден, для подтверждения перейдите по ссылке, отправленной на ваш почтовый ящик',
            });
          }
        } else {
          res.status(401).json({
            status: 'error',
            message: 'Указан неверный пароль',
          });
        }
      } else {
        res.status(404).json({
          status: 'error',
          message: 'Пользователь с таким email не найден',
        });
      }
    } catch (error) {
      res.send(500).json({
        status: 'error',
        message: JSON.stringify(error),
      });
    }
  }
  async register(req, res) {
    try {
      const errors = validator.validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() });
        return;
      }
      const candidate = await UserModel.findOne({ email: req.body.email });
      if (!candidate) {
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
            process.env.SERVER_PORT || 3000
          }/api/auth/verify?hash=${data.confirmHash}">по этой ссылке</a></p>`,
        });
        res.status(200).json({
          status: 'success',
          data: user,
        });
      } else {
        res.status(409).json({
          status: 'error',
          message: 'Пользователь уже существует',
        });
      }
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
          message: 'Пользователь не найден',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: JSON.stringify(error),
      });
    }
  }

  async checkUser(req, res) {
    try {
      const user = await UserModel.findById(req.user._id);
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'Пользователь не найден',
        });
      }
    } catch (error) {
      res.status(401).json({
        status: 'error',
        message: JSON.stringify(error),
      });
    }
  }
}

export const AuthCtrl = new Auth();
