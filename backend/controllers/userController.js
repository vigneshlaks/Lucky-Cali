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
      goals: [user.goal1, user.goal2, user.goal3].filter(Boolean), 
      challenges: [user.challenge1, user.challenge2, user.challenge3].filter(Boolean),
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

    // Fetch user challenges stored as JSON from the users table
    const userResult = await db.query(
      'SELECT challenges FROM users WHERE id = ?',
      [userId]
    );

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult[0];
    const challenges = user.challenges

    res.json({ challenges });
  } catch (error) {
    console.error('Error fetching challenges data:', error);
    res.status(500).json({ message: 'An error occurred while fetching challenges data.' });
  }
};

const generateChallengesBasedOnSkills = async (completedSkills, challengeCount = 3, currentChallenges = []) => {
  let fallbackSkills = ["floor-pu", "pull-up", "pb-dip"];
  const selectedChallenges = [];

  // Extract skill IDs from the current challenges to avoid duplicates
  const currentChallengeIds = currentChallenges.map(challenge => challenge.skill);

  // Filter completed skills to exclude those already in current challenges
  const availableSkills = completedSkills.filter(skill => !currentChallengeIds.includes(skill.skill_id));

  // Filter fallback skills to exclude those already in current challenges
  fallbackSkills = fallbackSkills.filter(skill => !currentChallengeIds.includes(skill));

  // Shuffle the filtered skills array to randomly pick skills
  const shuffledSkills = availableSkills.sort(() => 0.5 - Math.random());

  // Helper function to generate a random number in increments of 5
  const generateRandomRepsOrSeconds = () => {
    const min = 1;
    const max = 4;
    return (Math.floor(Math.random() * (max - min + 1)) + min) * 5;
  };

  // Select up to 'challengeCount' skills from the shuffled available skills
  for (let i = 0; i < challengeCount && i < shuffledSkills.length; i++) {
    selectedChallenges.push({
      skill: shuffledSkills[i].skill_id,
      repsOrSeconds: generateRandomRepsOrSeconds(),
    });
  }

  // If there are fewer than 'challengeCount' skills, fill the remaining slots with fallback skills
  while (selectedChallenges.length < challengeCount && fallbackSkills.length > 0) {
    const fallbackSkill = fallbackSkills.pop();
    selectedChallenges.push({
      skill: fallbackSkill,
      repsOrSeconds: generateRandomRepsOrSeconds(),
    });
  }

  return selectedChallenges;
};



// Submit selected challenges
exports.submitChallenges = async (req, res) => {
  try {
    const userId = req.user.id;
    const { checkedChallenges } = req.body;


    const currentSkills = await db.query(
      `SELECT u.skill_id
       FROM user_skills u
       WHERE u.user_id = ?
       AND u.status = 2`,
      [userId]
    );

    // Validate that challenges have been submitted
    if (!checkedChallenges || !Array.isArray(checkedChallenges) || checkedChallenges.length === 0) {
      return res.status(400).json({ message: 'No challenges selected' });
    }

    // Update user experience
    await db.query('UPDATE users SET experience = experience + 10 WHERE id = ?', [userId]);

    // Fetch the current challenges for the user
    const userResult = await db.query('SELECT challenges FROM users WHERE id = ?', [userId]);

    if (!userResult || !userResult.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Parse current challenges from the database
    let currentChallenges = userResult[0].challenges;

    const updatedChallenges = await Promise.all(
      currentChallenges.map(async (challenge) => {
        // Check if the challenge is among the ones that were checked/submitted by the user
        const isChallengeChecked = checkedChallenges.some(
          (checked) => checked.skill === challenge.skill && checked.repsOrSeconds === challenge.repsOrSeconds
        );

        // If the challenge was completed, generate a new one
        if (isChallengeChecked) {
          let newChallenge;
          do {
            // Generate a new challenge considering current skills and excluding current challenges
            const generatedChallenges = await generateChallengesBasedOnSkills(currentSkills, 1, currentChallenges);
            newChallenge = generatedChallenges[0]; // Get one new challenge
          } while (currentChallenges.some(c => c.skill === newChallenge.skill)); // Ensure the new challenge is unique
          return newChallenge;
        }

        // If the challenge was not completed, keep it as is
        return challenge;
      })
    );

    // Update the user's challenges in the database
    await db.query('UPDATE users SET challenges = ? WHERE id = ?', [JSON.stringify(updatedChallenges), userId]);

    res.status(200).json({ message: 'Challenges submitted successfully!' });
  } catch (error) {
    console.error('Error submitting challenges:', error);
    res.status(500).json({ message: 'Error submitting challenges' });
  }
};

exports.rerollChallenges = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get the skills the user is currently working on
    const completedSkills = await db.query(
      `SELECT u.skill_id
       FROM user_skills u
       WHERE u.user_id = ?
       AND u.status = 2`,
      [userId]
    );

    // Generate new challenges based on the user's completed skills
    const newChallenges = await generateChallengesBasedOnSkills(completedSkills);

    // Update the user's challenges JSON column in the database
    await db.query(
      `UPDATE users
       SET challenges = ?
       WHERE id = ?`,
      [JSON.stringify(newChallenges), userId]
    );

    res.json({ challenges: newChallenges });
  } catch (error) {
    console.error('Error updating challenges based on completed skills:', error);
    res.status(500).json({ message: 'An error occurred while updating challenges.' });
  }
};

exports.getUserStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user data including the `in_competition` status
    const user = await db.query('SELECT id, username, in_competition FROM users WHERE id = ?', [userId]);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's status
    res.status(200).json({
      id: user[0].id,
      username: user[0].username,
      in_competition: user[0].in_competition,
    });
  } catch (error) {
    console.error('Error fetching user status:', error);
    res.status(500).json({ message: 'Failed to fetch user status', error: error.message });
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

    let log = logResult[0];

    // Convert BigInt values to strings (if necessary)
    log = {
      ...log,
      id: log.id ? log.id.toString() : null,  // Assuming `id` is a BigInt field
      user_id: log.user_id ? log.user_id.toString() : null  // Assuming `user_id` is a BigInt field
    };

    // Respond with the workout log data
    res.json({ success: true, log });
  } catch (error) {
    console.error('Error fetching workout log data:', error);
    res.status(500).json({ message: 'An error occurred while fetching workout log data.' });
  }
};


exports.updateSkillStatus = async (req, res) => {
  const { skillId } = req.params;
  const { status, user_id, acquired_at } = req.body; // Include additional fields if needed

  try {
    // Validate input
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    // Check if the skill exists in the database
    const [existingSkill] = await db.query(
      'SELECT * FROM user_skills WHERE skill_id = ? AND user_id = ?',
      [skillId, user_id]
    );

    if (existingSkill.length > 0) {
      // If the skill exists, update its status
      const [updateResult] = await db.query(
        'UPDATE user_skills SET status = ? WHERE skill_id = ? AND user_id = ?',
        [status, skillId, user_id]
      );

      // Check if any rows were affected
      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ message: 'Skill not found' });
      }

      // Respond with a success message
      return res.status(200).json({ message: 'Skill status updated successfully' });
    } else {
      // If the skill does not exist, insert a new skill entry
      const [insertResult] = await db.query(
        'INSERT INTO user_skills (user_id, skill_id, status, acquired_at) VALUES (?, ?, ?, ?)',
        [user_id, skillId, status, acquired_at || new Date()]
      );

      // Respond with a success message
      return res.status(201).json({ message: 'Skill created successfully', skillId: insertResult.insertId });
    }
  } catch (error) {
    console.error('Error updating or creating skill status:', error);
    res.status(500).json({ message: 'Failed to update or create skill status' });
  }
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

exports.updateSkillStatus = async (req, res) => {
  const { skillId } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  // Validate the new status
  if (![1, 2, 3].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    // Check if the skill exists for the user
    const existingSkills = await db.query(
      `SELECT * FROM user_skills WHERE skill_id = ? AND user_id = ?`,
      [skillId, userId]
    );

    // Check if the query returned a valid result
    if (existingSkills && existingSkills.length > 0) {
      // Skill exists, update the status
      const result = await db.query(
        `UPDATE user_skills 
         SET status = ? 
         WHERE skill_id = ? AND user_id = ?`,
        [status, skillId, userId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Failed to update skill status.' });
      }

      res.status(200).json({ message: 'Skill status updated successfully' });
    } else {
      // Skill doesn't exist, insert a new record
      const result = await db.query(
        `INSERT INTO user_skills (user_id, skill_id, status, acquired_at) 
         VALUES (?, ?, ?, NOW())`,
        [userId, skillId, status]
      );

      if (result.affectedRows === 0) {
        return res.status(500).json({ message: 'Failed to create the skill entry.' });
      }

      res.status(201).json({ message: 'Skill created and status set successfully' });
    }
  } catch (error) {
    console.error('Error updating or creating skill status:', error);
    res.status(500).json({ message: 'An error occurred while updating or creating the skill status.' });
  }
};


exports.getAllSkills = async (req, res, next) => {
  try {
    const userId = req.user.id;

    try {
      // Fetch all skills associated with the authenticated user
      const allSkills = await db.query(
        `SELECT *
         FROM user_skills u
         WHERE u.user_id = ?`,
        [userId]
      );

      res.json(allSkills);
    } catch (error) {
      console.error('Error fetching user skills:', error);
      res.status(500).json({ message: 'An error occurred while fetching user skills.' });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};

exports.logoutUser = (req, res) => {
  try {
    // Clear the refreshToken cookie
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: true, 
      sameSite: 'Strict', 
      maxAge: 0, 
      path: '/',
    });

    // Send a response to confirm logout
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'An error occurred while logging out' });
  }
};
