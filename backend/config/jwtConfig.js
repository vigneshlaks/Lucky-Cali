require('dotenv').config();
module.exports = {
    accessTokenSecret: process.env.JWT_SECRET || '',
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET || '',
    issuer: process.env.JWT_ISSUER || '',
    audience: process.env.JWT_AUDIENCE || ''
  };