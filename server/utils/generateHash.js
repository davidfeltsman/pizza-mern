import crypto from 'crypto';

export const generateSHA = (val) => {
  return crypto.createHash('sha256').update(val).digest('hex');
};
