import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/UserModel.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

export function jwtConfig(passport) {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      const user = await UserModel.findOne({ _id: payload._id });
      try {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        console.log(error);
      }
    }),
  );
}
