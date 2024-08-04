const bcrypt = require('bcryptjs');
const { query } = require('../config/db');

// Function to find user by email
async function findUserByEmail(email) {
  try {
    const rows = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return null;
    return rows[0];
  } catch (err) {
    throw err;
  }
}

// Function to find user by ID
async function findUserById(id) {
  try {
    const rows = await query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return rows[0];
  } catch (err) {
    throw err; 
  }
}

// Function to find user by username
async function findUserByUsername(username) {
    try {
      const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length === 0) return null;
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

// Function to create a new user
async function createUser(name, email, password, authProvider) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await query('INSERT INTO users (name, email, password, auth_provider) VALUES (?, ?, ?, ?)', 
                                  [name, email, hashedPassword, authProvider]);
      const newUser = {
        id: result.insertId,
        name,
        email,
        authProvider
      };
      return newUser;
    } catch (err) {
      throw err;
    }
  }
  

module.exports = { findUserByEmail, findUserById, createUser, findUserByUsername };
