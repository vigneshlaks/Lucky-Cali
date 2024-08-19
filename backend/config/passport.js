const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { findUserByEmail, findUserById, createUser, findUserByUsername } = require('../utils/userUtils.js');
const jwtConfig = require('./jwtConfig.js');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
      const user = await findUserByUsername(username);
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
  
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.accessTokenSecret,
  issuer: jwtConfig.issuer,
  audience: jwtConfig.audience
}, async (jwt_payload, done) => {
  try {
    const user = await findUserById(jwt_payload.sub);
    if (user) return done(null, user);
    else return done(null, false);
  } catch (err) {
    return done(err, false);
  }
}));


/*
passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: '/auth/google/callback'
}, async (token, tokenSecret, profile, done) => {
  try {
    let user = await findUserByEmail(profile.emails[0].value);
    if (!user) {
      user = await createUser(profile.displayName, profile.emails[0].value, 'google_oauth');
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
*/