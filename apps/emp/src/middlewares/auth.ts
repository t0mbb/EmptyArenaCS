import jwt from 'jsonwebtoken';

import { RoleName } from '../models/account/account.model';

class JwtError extends Error {
  status: number;
}

export function verifyToken(req, _res, next) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken || !bearerToken.startsWith('Bearer')) {
    const error =  new JwtError('Jwt error');
    error.status = 401;
    throw error;
  }
  
  const userAccessToken = bearerToken.split('Bearer ')[1];
  const userData : any = jwt.verify(userAccessToken, process.env.JWT_SECRET);
  ///// tach va check lai useraccount
  req.user = userData.userAccount;

  return next();
}

export function authorization(allowRole: RoleName[]) {
  return function(req, res, next) {
    const userData = req.user;
    if (!allowRole.includes(userData.role as RoleName)) {
      const error =  new JwtError('Unauthorized');
      error.status = 401;
      throw error;
    }

    return next();
  }
}
