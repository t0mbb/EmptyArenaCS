import { Request, Response, NextFunction } from 'express';
import { findOneAccount } from '../service/account.service';
import jwt from 'jsonwebtoken';

class LoginError extends Error {
  status: number;
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const userAccount = await findOneAccount({ username, password });

    if (!userAccount) {
      const error = new LoginError('Invalid username or password');
      error.status = 401;
      throw error;
    }

    const accessToken = jwt.sign(userAccount, process.env.JWT_SECRET);

    return res.json({
      message: 'Login success',
      data: {
        accessToken
      }
    })
  } catch (err) {
    next(err);
  }
}
