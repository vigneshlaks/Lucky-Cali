const bcrypt = require('bcrypt');
const db = require('../config/db')
const {generateAccessToken, generateRefreshToken} = require('../utils/tokenUtils')
const passport = require('passport')

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

      // Generate tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 20 * 24 * 60 * 60 * 1000 // 20 days
      });

      res.json({ accessToken });
    } catch (error) {
      console.error('Error generating tokens:', error);
      res.status(500).json({ message: 'An error occurred while generating tokens' });
    }
  })(req, res, next);
};

exports.getObjectives = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user goals and challenges from the user table
    const userResult = await db.query(
      'SELECT goal1, goal2, goal3, challenge1, challenge2, challenge3 FROM users WHERE id = ?',
      [userId]
    );

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult[0];

    // Construct the response data
    const responseData = {
      goals: [user.goal1, user.goal2, user.goal3].filter(Boolean), // Remove null or undefined values
      challenges: [user.challenge1, user.challenge2, user.challenge3].filter(Boolean), // Remove null or undefined values
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching objectives data:', error);
    res.status(500).json({ message: 'An error occurred while fetching objectives data.' });
  }
};


exports.getGoals = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user goals from the user table
    const userResult = await db.query(
      'SELECT goal1, goal2, goal3 FROM users WHERE id = ?',
      [userId]
    );

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult[0];

    // Construct the response data
    const goals = [user.goal1, user.goal2, user.goal3].filter(Boolean); // Remove null or undefined values

    res.json({ goals });
  } catch (error) {
    console.error('Error fetching goals data:', error);
    res.status(500).json({ message: 'An error occurred while fetching goals data.' });
  }
};

exports.getChallenges = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user challenges from the user table
    const userResult = await db.query(
      'SELECT challenge1, challenge2, challenge3 FROM users WHERE id = ?',
      [userId]
    );

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult[0];

    // Construct the response data
    const challenges = [user.challenge1, user.challenge2, user.challenge3].filter(Boolean); // Remove null or undefined values

    res.json({ challenges });
  } catch (error) {
    console.error('Error fetching challenges data:', error);
    res.status(500).json({ message: 'An error occurred while fetching challenges data.' });
  }
};

exports.getWorkoutLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentDate = new Date().toISOString().split('T')[0];  // Format the current date as YYYY-MM-DD

    // Fetch the workout log for the current date
    const logResult = await db.query(
      'SELECT title, description FROM logs WHERE user_id = ? AND date = ?',
      [userId, currentDate]
    );

    // Check if a log was found
    if (logResult.length === 0) {
      return res.status(404).json({ message: 'No workout log found for today' });
    }

    const log = logResult[0];

    // Respond with the workout log data
    res.json({ success: true, log });
  } catch (error) {
    console.error('Error fetching workout log data:', error);
    res.status(500).json({ message: 'An error occurred while fetching workout log data.' });
  }
};

exports.createLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, date } = req.body; // Extract data from the request body

    // Validate input data
    if (!userId || !title || !description || !date) {
      return res.status(400).json({ message: 'Invalid input data. Please provide all required fields.' });
    }

    // Check if a log already exists for today
    const existingLog = await db.query(
      `SELECT * FROM logs WHERE user_id = ? AND date = ?`,
      [userId, date]
    );

    if (existingLog.length > 0) {
      return res.status(400).json({ message: 'A workout log for today has already been created.' });
    }

    // Insert the new workout log into the database
    const result = await db.query(
      `INSERT INTO logs (user_id, title, description, date, created_at, updated_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [userId, title, description, date]
    );

    // Send a success response
    res.json({ success: true, message: 'Workout log created successfully.' });
  } catch (error) {
    console.error('Error creating workout log:', error);
    res.status(500).json({ message: 'An error occurred while creating the workout log.' });
  }
};

exports.updateLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, date } = req.body; // Extract data from the request body

    // Validate input data
    if (!userId || !title || !description || !date) {
      return res.status(400).json({ message: 'Invalid input data. Please provide all required fields.' });
    }

    // Update the workout log in the database
    const result = await db.query(
      `UPDATE logs
       SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND date = ?`,
      [title, description, userId, date]
    );

    // Check if the log was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Workout log not found for the specified date.' });
    }

    // Send a success response
    res.json({ success: true, message: 'Workout log updated successfully.' });
  } catch (error) {
    console.error('Error updating workout log:', error);
    res.status(500).json({ message: 'An error occurred while updating the workout log.' });
  }
};

exports.rerollChallenges = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get the skills the user is currently working on
    const completedSkills = await db.query(
      `SELECT u.skill_id
       FROM user_skills u
       WHERE u.user_id = ${userId}
       AND u.status = 1`
    );

    // Generate new challenges based on the user's completed skills
    const newChallenges = await generateChallengesBasedOnSkills(completedSkills);

    // Update the user's challenges in the database
    await db.query(
      `UPDATE users
       SET challenge1 = ?, challenge2 = ?, challenge3 = ?
       WHERE id = ?`,
      [newChallenges[0], newChallenges[1], newChallenges[2], userId]
    );

    res.json({ challenges: newChallenges });
  } catch (error) {
    console.error('Error updating challenges based on completed skills:', error);
    res.status(500).json({ message: 'An error occurred while updating challenges.' });
  }
};

const generateChallengesBasedOnSkills = async (completedSkills) => {
  // List of fallback skills if there are not enough completed skills
  const fallbackSkills = ["floor-pu", "pull-up", "pb-dip"];
  const selectedChallenges = [];

  // Shuffle the completed skills array to randomly pick skills
  const shuffledSkills = completedSkills.sort(() => 0.5 - Math.random());

  // Select up to 3 skills from the shuffled completed skills
  for (let i = 0; i < 3 && i < shuffledSkills.length; i++) {
    selectedChallenges.push(shuffledSkills[i].skill_id);
  }

  // If there are fewer than 3 skills, fill the remaining slots with fallback skills
  while (selectedChallenges.length < 3) {
    const fallbackSkill = fallbackSkills.pop();
    selectedChallenges.push(fallbackSkill);
  }

  return selectedChallenges;
};




exports.getCompletedSkills = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    try {
      if (err) {
        console.error('Error during authentication:', err);
        return res.status(500).json({ message: 'An error occurred during authentication' });
      }

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const userId = user.id;
      

      try {
        const completedSkills = await db.query(
          `SELECT u.skill_id
           FROM user_skills u
           WHERE u.user_id = ${userId}`);
        
        res.json(completedSkills);
      } catch (error) {
        console.error('Error fetching completed skills:', error);
        res.status(500).json({ message: 'An error occurred while fetching completed skills.' });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  })(req, res, next);
};