import { Request, Response, NextFunction } from 'express';
import { findOneAccount } from '../../service/account.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { RoleName } from '../../models/account/account.model';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import account from '../../models/account/account.model'
class LoginError extends Error {
  status: number;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: '/auth/google/callback',
    }, (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // Check if google profile exist.
      if (profile.id) {
  
        account.findOne({googleId: profile.id})
          .then((existingUser) => {
            if (existingUser) {
              done(null, existingUser);
            } else {
              const userAccount = new account({
                googleId: profile.id,
                email: profile.emails[0].value,
                fullname: profile.name.givenName,
                password : "abc",
                role : RoleName.GUEST
              })
                .save()
                .then(user => done(null, user));
            }
          })
      }
    })
);
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userAccount = await findOneAccount({ email });

    if (!userAccount) {
      const error = new LoginError('Invalid username or password');
      error.status = 401;
      throw error;
    }

    if (!bcrypt.compareSync(password, userAccount.password)) {
      const error = new LoginError('Invalid username or password');
      error.status = 401;
      throw error;
    }

    const accessToken = jwt.sign({ userAccount }, process.env.JWT_SECRET);

    return res.json({
      message: 'Login success',
      accessToken,
      userData: userAccount
    });
  } catch (err) {
    next(err);
  }
}
export const googleAuth = (req: Request, res: Response, next: NextFunction) => {
passport.authenticate('google', { scope: ['profile', 'email'] });
};

export const googleAuthCallback = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', { failureRedirect: '/login' }, (err, userAccount) => {
    if (err) {
      return next(err);
    }
    const token = jwt.sign(
      { userAccount }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );
  return res.json({
      accessToken: token,
      userData: userAccount
    });
  })
};


