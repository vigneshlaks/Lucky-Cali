const db = require('../config/db');

const competeController = {};

competeController.getLeaderboard = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    const result = await db.query(
      'SELECT * FROM leaderboard ORDER BY score DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const totalPlayers = await db.query('SELECT COUNT(*) FROM leaderboard');
    const totalPages = Math.ceil(totalPlayers.rows[0].count / limit);

    res.json({
      players: result.rows,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'An error occurred while fetching leaderboard data.' });
  }
};

competeController.enterContest = async (req, res) => {
  const userId = req.user.id;
  const { duration, goals } = req.body;

  try {
    // Set the end date based on the duration
    let endDate = new Date();
    if (duration === '2 Week') {
      endDate.setDate(endDate.getDate() + 14); // Add 14 days
    } else if (duration === '4 Week') {
      endDate.setDate(endDate.getDate() + 28); // Add 28 days
    }

    // Find the contest created by the current user
  const userContest = await db.query(
      'SELECT * FROM contests WHERE created_by = ?',
      [userId]
    );

    let contestId;

    if (userContest.length === 0) {
      // If no contest exists, create a new one
      const [newContest] = await db.query(
        'INSERT INTO contests (start_date, end_date, created_by, status, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
        [new Date(), endDate, userId, 'ongoing']
      );

      // Get the newly created contest ID
      contestId = newContest.insertId;
    } else {
      // Use the existing contest
      const contest = userContest[0];
      contestId = contest.id;

      // Update the contest to set status to ongoing and adjust the end date
      await db.query(
        'UPDATE contests SET status = ?, end_date = ?, updated_at = NOW() WHERE id = ?',
        ['ongoing', endDate, contestId]
      );
    }

    // Convert the goals object to JSON for storing in the database
    const goalsJson = JSON.stringify(goals);

    // Update the user's competition status and goals
    await db.query(
      'UPDATE users SET in_competition = ?, goals = ? WHERE id = ?',
      [
        1, // User is now in the competition
        goalsJson, // Store the goals as a JSON object in the database
        userId, // User ID
      ]
    );

    // Send success response back to the frontend
    res.status(201).json({ message: 'Successfully entered the competition.', contestId });
  } catch (error) {
    console.error('Error entering the contest:', error);
    res.status(500).json({ message: 'Failed to enter the contest.', error: error.message });
  }
};



module.exports = competeController;