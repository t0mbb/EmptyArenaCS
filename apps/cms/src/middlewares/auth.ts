import jwt from 'jsonwebtoken';

class JwtError extends Error {
  status: number;
}

export function verifyToken(req, _res, next) {
  const bearerToken = req.headers.Authorization;
  if (!bearerToken || !bearerToken.startsWith('Bearer')) {
    const error =  new JwtError('Jwt error');
    error.status = 401;
    throw error;
  }
  
  const userAccessToken = bearerToken.split('Bearer ')[0];
  const userData = jwt.verify(userAccessToken, process.env.JWT_SECRET);
  req.user = userData;

  return next();
}
