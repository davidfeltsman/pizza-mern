import mongoose from 'mongoose';

const userScheme = new mongoose.Schema({
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
  salt: {
    required: true,
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  confirmHash: {
    unique: true,
    required: true,
    type: String,
  },
  role: {
    type: String,
    default: 'manager',
  },
});

userScheme.set('toJSON', {
  transform: function (_, obj) {
    delete obj.password;
    delete obj.confirmHash;
    delete obj.salt;
    return obj;
  },
});

export const UserModel = mongoose.model('User', userScheme);
