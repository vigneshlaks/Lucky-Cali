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

    const userResult = await db.query(
      'SELECT goal1, goal2, goal3, challenge1, challenge2, challenge3 FROM users WHERE id = ?',
      [userId]
    );

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult[0];

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

    
    const userResult = await db.query(
      'SELECT goal1, goal2, goal3 FROM users WHERE id = ?',
      [userId]
    );

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult[0];

    
    const goals = [user.goal1, user.goal2, user.goal3].filter(Boolean); 

    res.json({ goals });
  } catch (error) {
    console.error('Error fetching goals data:', error);
    res.status(500).json({ message: 'An error occurred while fetching goals data.' });
  }
};

exports.getChallenges = async (req, res) => {
  try {
    const userId = req.user.id;

    
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

  const currentChallengeIds = currentChallenges.map(challenge => challenge.skill);

  const availableSkills = completedSkills.filter(skill => !currentChallengeIds.includes(skill.skill_id));

  fallbackSkills = fallbackSkills.filter(skill => !currentChallengeIds.includes(skill));

  const shuffledSkills = availableSkills.sort(() => 0.5 - Math.random());

  
  const generateRandomRepsOrSeconds = () => {
    const min = 1;
    const max = 4;
    return (Math.floor(Math.random() * (max - min + 1)) + min) * 5;
  };

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

    
    if (!checkedChallenges || !Array.isArray(checkedChallenges) || checkedChallenges.length === 0) {
      return res.status(400).json({ message: 'No challenges selected' });
    }

    
    await db.query('UPDATE users SET experience = experience + 10 WHERE id = ?', [userId]);

    
    const userResult = await db.query('SELECT challenges FROM users WHERE id = ?', [userId]);

    if (!userResult || !userResult.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    let currentChallenges = userResult[0].challenges;

    const updatedChallenges = await Promise.all(
      currentChallenges.map(async (challenge) => {
        
        const isChallengeChecked = checkedChallenges.some(
          (checked) => checked.skill === challenge.skill && checked.repsOrSeconds === challenge.repsOrSeconds
        );

        
        if (isChallengeChecked) {
          let newChallenge;
          do {
            
            const generatedChallenges = await generateChallengesBasedOnSkills(currentSkills, 1, currentChallenges);
            newChallenge = generatedChallenges[0]; 
          } while (currentChallenges.some(c => c.skill === newChallenge.skill)); // Ensure the new challenge is unique
          return newChallenge;
        }

        return challenge;
      })
    );

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

    const completedSkills = await db.query(
      `SELECT u.skill_id
       FROM user_skills u
       WHERE u.user_id = ?
       AND u.status = 2`,
      [userId]
    );

    
    const newChallenges = await generateChallengesBasedOnSkills(completedSkills);

    
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

    
    const user = await db.query('SELECT id, username, in_competition FROM users WHERE id = ?', [userId]);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    
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
    const currentDate = new Date().toISOString().split('T')[0];  

    
    const logResult = await db.query(
      'SELECT title, description FROM logs WHERE user_id = ? AND date = ?',
      [userId, currentDate]
    );

    
    if (logResult.length === 0) {
      return res.status(404).json({ message: 'No workout log found for today' });
    }

    let log = logResult[0];

    
    log = {
      ...log,
      id: log.id ? log.id.toString() : null,  
      user_id: log.user_id ? log.user_id.toString() : null  
    };

    
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

    
    const [existingSkill] = await db.query(
      'SELECT * FROM user_skills WHERE skill_id = ? AND user_id = ?',
      [skillId, user_id]
    );

    if (existingSkill.length > 0) {
    
      const [updateResult] = await db.query(
        'UPDATE user_skills SET status = ? WHERE skill_id = ? AND user_id = ?',
        [status, skillId, user_id]
      );

     
      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ message: 'Skill not found' });
      }

      
      return res.status(200).json({ message: 'Skill status updated successfully' });
    } else {
      
      const [insertResult] = await db.query(
        'INSERT INTO user_skills (user_id, skill_id, status, acquired_at) VALUES (?, ?, ?, ?)',
        [user_id, skillId, status, acquired_at || new Date()]
      );

      
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
    
    const existingSkills = await db.query(
      `SELECT * FROM user_skills WHERE skill_id = ? AND user_id = ?`,
      [skillId, userId]
    );

    
    if (existingSkills && existingSkills.length > 0) {
      
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
    
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: true, 
      sameSite: 'Strict', 
      maxAge: 0, 
      path: '/',
    });

    
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'An error occurred while logging out' });
  }
};

// Controller function to get the user's rank and experience
exports.getUserRankAndExperience = async (req, res) => {
  try {
    const userId = req.user.id;

    const [user] = await db.query(
      'SELECT rank, experience FROM users WHERE id = ?',
      [userId]
    );

    
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    res.status(200).json({
      rank: user.rank,
      experience: user.experience,
    });
  } catch (error) {
    console.error('Error fetching rank and experience:', error);
    res.status(500).json({ message: 'Failed to fetch rank and experience', error: error.message });
  }
};

