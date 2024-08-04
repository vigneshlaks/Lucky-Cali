const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const generateAccessToken = (user) => {
  return jwt.sign(
    { 
      sub: user.id,
      type: 'access'
    },
    jwtConfig.accessTokenSecret,
    {
      expiresIn: '15m',
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { 
      sub: user.id,
      type: 'refresh'
    },
    jwtConfig.refreshTokenSecret,
    {
      expiresIn: '20d',
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience
    }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };