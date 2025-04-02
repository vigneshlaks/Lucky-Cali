const db = require('../config/db');

exports.getPosts = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const posts = await db.query('SELECT * FROM posts', [userId]);
  
      const postsWithConvertedIds = posts.map(post => ({
        ...post,
        id: post.id.toString(),  
        user_id: post.user_id.toString() 
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
    
    const logs = await db.query('SELECT * FROM logs WHERE id = ?', [logId]);

    // If no log is found, return a 404 error
    if (logs.length === 0) {
      return res.status(404).json({ message: 'Log not found' });
    }

    res.json(logs[0]);
  } catch (error) {
    console.error('Error fetching log by ID:', error);
    res.status(500).json({ message: 'An error occurred while fetching the log.' });
  }
};

exports.getPaginatedPosts = async (req, res) => {
  try {
    // Get page and limit from query parameters, with defaults if not provided
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const totalPostsResult = await db.query('SELECT COUNT(*) AS total FROM posts');

    const totalPosts = Number(totalPostsResult[0].total);

    var posts = await db.query(
      'SELECT * FROM posts ORDER BY published_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    
    const totalPages = Math.ceil(totalPosts / limit);

    posts = posts.map(post => ({
      ...post,
      id: Number(post.id)
    }));

    res.json({
      posts,
      totalPages,
      currentPage: page,
      totalPosts,
    });
  } catch (error) {
    console.error('Error fetching paginated posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

  exports.getPostById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const postResult = await db.query(
        'SELECT * FROM posts WHERE id = ?',
        [id]
      );
    

      if (postResult.length === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      let post = postResult[0];
  
      post = Object.fromEntries(
        Object.entries(post).map(([key, value]) => 
          typeof value === 'bigint' ? [key, value.toString()] : [key, value]
        )
      );
    
  
      res.json({ success: true, post });
    } catch (error) {
      console.error('Error fetching post data:', error);
      res.status(500).json({ message: 'An error occurred while fetching post data.' });
    }
  };

  exports.getPaginatedLogs = async (req, res) => {
    try {
      // Get page and limit from query parameters, with defaults if not provided
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;

      const userId = req.user.id;
      const offset = (page - 1) * limit;
  
      const totalLogsResult = await db.query('SELECT COUNT(*) AS total FROM logs WHERE user_id = ?', [userId]);
  
      const totalLogs = Number(totalLogsResult[0].total);
  
      let logs = await db.query(
        'SELECT * FROM logs WHERE user_id = ? ORDER BY date DESC LIMIT ? OFFSET ?',
        [userId, limit, offset]
      );
  
      const totalPages = Math.ceil(totalLogs / limit);
  
      logs = logs.map(log => ({
        ...log,
        id: Number(log.id),
      }));
  
      res.json({
        logs,
        totalPages,
        currentPage: page,
        totalLogs,
      });
    } catch (error) {
      console.error('Error fetching paginated logs:', error);
      res.status(500).json({ message: 'Failed to fetch workout logs' });
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
  
      res.status(200).json({ log: logs[0] }); 
    } catch (error) {
      console.error('Error fetching today\'s workout log:', error);
      res.status(500).json({ message: 'An error occurred while fetching today\'s workout log.' });
    }
  };
  

  exports.createLog = async (req, res) => {
    try {
      const userId = req.user.id;
      const { title, description, date } = req.body; 
  
      // Input data validation
      if (!userId || !title || !description || !date) {
        return res.status(400).json({ message: 'Invalid input data. Please provide all required fields.' });
      }
  
      
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
    const date = new Date().toISOString().split('T')[0]; 

    
    if (!userId || !title || !description) {
      return res.status(400).json({ message: 'Invalid input data. Please provide all required fields.' });
    }

    
    const result = await db.query(
      `UPDATE logs
       SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND date = ?`,
      [title, description, userId, date]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Workout log not found for today.' });
    }

    
    res.json({ success: true, message: 'Workout log updated successfully.' });
  } catch (error) {
    console.error('Error updating workout log:', error);
    res.status(500).json({ message: 'An error occurred while updating the workout log.' });
  }
};


  
  
  
  
  
  