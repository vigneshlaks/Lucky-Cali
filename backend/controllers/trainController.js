// src/controllers/trainController.js
const db = require('../config/db');

// Fetch all posts
exports.getPosts = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Fetch posts from the database
      const posts = await db.query('SELECT * FROM posts', [userId]);
  
      // Convert BigInt fields to strings
      const postsWithConvertedIds = posts.map(post => ({
        ...post,
        id: post.id.toString(), // Convert BigInt to string
        user_id: post.user_id.toString() // Convert BigInt to string if needed
      }));
  
      res.json(postsWithConvertedIds);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'An error occurred while fetching posts.' });
    }
  };

  exports.getLogById = async (req, res) => {
    try {
      const logId = req.params.id;
      
      // Query to get the log by ID
      const logs = await db.query('SELECT * FROM logs WHERE id = ?', [logId]);
  
      // If no log is found, return a 404 error
      if (logs.length === 0) {
        return res.status(404).json({ message: 'Log not found' });
      }
  
      // Respond with the log data
      res.json(logs[0]);
    } catch (error) {
      console.error('Error fetching log by ID:', error);
      res.status(500).json({ message: 'An error occurred while fetching the log.' });
    }
  };

  exports.getPostById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Fetch the post from the database by ID
      const postResult = await db.query(
        'SELECT * FROM posts WHERE id = ?',
        [id]
      );
    

      // Check if a post was found
      if (postResult.length === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      let post = postResult[0];
  
      // Convert BigInt values to strings to avoid JSON serialization issues
      post = Object.fromEntries(
        Object.entries(post).map(([key, value]) => 
          typeof value === 'bigint' ? [key, value.toString()] : [key, value]
        )
      );
    
  
      // Respond with the post data
      res.json({ success: true, post });
    } catch (error) {
      console.error('Error fetching post data:', error);
      res.status(500).json({ message: 'An error occurred while fetching post data.' });
    }
  };
  

  exports.getAllUserLogs = async (req, res) => {
    try {
      const userId = req.user.id;

      const logs = await db.query('SELECT * FROM logs WHERE user_id = ?', [userId]);
  
      res.json(logs);
    } catch (error) {
      console.error('Error fetching workout log data:', error);
      res.status(500).json({ message: 'An error occurred while fetching workout log data.' });
    }
  };

  exports.getTodayLog = async (req, res) => {
    try {
      const userId = req.user.id;
      const today = new Date().toISOString().split('T')[0];
  
      const logs = await db.query('SELECT * FROM logs WHERE user_id = ? AND date = ?', [userId, today]);
  
      if (logs.length === 0) {
        return res.status(200).json({ log: null });
      }
  
      res.status(200).json({ log: logs[0] }); // Return the log found for today
    } catch (error) {
      console.error('Error fetching today\'s workout log:', error);
      res.status(500).json({ message: 'An error occurred while fetching today\'s workout log.' });
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
    const { title, description } = req.body;
    const date = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // Validate input data
    if (!userId || !title || !description) {
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
      return res.status(404).json({ message: 'Workout log not found for today.' });
    }

    // Send a success response
    res.json({ success: true, message: 'Workout log updated successfully.' });
  } catch (error) {
    console.error('Error updating workout log:', error);
    res.status(500).json({ message: 'An error occurred while updating the workout log.' });
  }
};


  
  
  
  
  
  