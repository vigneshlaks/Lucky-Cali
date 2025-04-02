const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { findUserByEmail, findUserById, createUser, findUserByUsername } = require('../utils/userUtils');
const jwtConfig = require('../config/jwtConfig');
const {generateAccessToken, generateRefreshToken} = require('../utils/tokenUtils')


exports.loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    try {
      if (err) {
        console.error('Error during authentication:', err);
        return res.status(500).json({ message: 'An error occurred during authentication' });
      }
      if (!user) {
        return res.status(400).json({ message: info.message || 'Invalid credentials' });
      }
      
      // refresh token rotation
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });

      res.json({ accessToken });
    } catch (error) {
      console.error('Error generating tokens:', error);
      res.status(500).json({ message: 'An error occurred while generating tokens' });
    }
  })(req, res, next);
};

// Register user
/*
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the email or username already exists
        const existingUsers = await db.query(
            'SELECT email, username FROM users WHERE email = ? OR username = ?',
            [email, username]
        );

        if (existingUsers.some(user => user.email === email)) {
            return res.status(400).json({
                success: false,
                message: 'Email is already in use.',
            });
        }

        if (existingUsers.some(user => user.username === username)) {
            return res.status(400).json({
                success: false,
                message: 'Username is already in use.',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const result = await db.query(
            'INSERT INTO users (username, email, password, joinedDate) VALUES (?, ?, ?, NOW())',
            [username, email, hashedPassword]
        );

        // Create the user profile response
        const userProfile = {
            id: result.insertId.toString(),
            username,
            email,
            joinedDate: new Date().toISOString().split('T')[0],
        };

        // Send the response
        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            user: userProfile,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering user.',
        });
    }
};
*/


exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not provided' });
    }
    try {
      const decoded = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret);
      const user = await findUserById(decoded.sub);
      if (!user) {
          return res.status(403).json({ message: 'Invalid refresh token' });
      }
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.json({ accessToken: newAccessToken });
    } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ message: 'Error refreshing token' });
    }
};

