import { findUserForAuth, findUserWithEmailAndPassword } from '@/api-lib/db';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import dbConnect from '../mongoose';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
  dbConnect().then(() => {
    findUserForAuth(id).then(
      (user) => done(null, user),
      (err) => done(err)
    );
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      await dbConnect();
      const user = await findUserWithEmailAndPassword(email, password);
      if (user) done(null, user);
      else done(null, false, { message: 'Email or password is incorrect' });
    }
  )
);

export default passport;
