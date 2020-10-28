import { model, Schema } from 'mongoose';

const userScheme = new Schema({
  email: {
    unique: true,
    required: true,
    type: String,
  },
  username: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  confirmed: Boolean,
  confirmed_hash: {
    required: true,
    type: String,
  },
  role: String,
});

export const UserModel = model('User', userScheme);
