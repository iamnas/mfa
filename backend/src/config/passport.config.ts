import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User, { UserType } from '../models/user';

passport.use(new LocalStrategy(
  { usernameField: "email" },
  async (email: string, password: string, done: (error: any, user?: any, info?: any) => void) => {

    try {
      const user = await User.findOne({ email: email });

      console.log(user);


      if (!user) {
        return done(false, { message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(false, { message: "Invalid Credentials" });
      }
      return done(null, user, { message: "Logged in successfully" });

    } catch (error) {

      console.log(error);
      return done(error);

    }

  }
));


passport.serializeUser((user: any, done) => {
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
