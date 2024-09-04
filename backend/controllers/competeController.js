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

competeController.enterCompetition = async (req, res) => {
  console.log("got here");
  const userId = req.user.id;
  const { competitionId, otherData } = req.body; // Assuming these values are sent in the request body

  try {
    // Check if the user is already entered in the competition
    const [existingEntries] = await db.query(
      'SELECT * FROM competition_entries WHERE user_id = ? AND competition_id = ?',
      [userId, competitionId]
    );

    // Check if there is an existing entry
    if (existingEntries.length > 0) {
      return res.status(400).json({ message: 'User is already entered in this competition.' });
    }

    // Insert the entry into the database
    const [result] = await db.query(
      'INSERT INTO competition_entries (user_id, competition_id, entry_data) VALUES (?, ?, ?)',
      [userId, competitionId, JSON.stringify(otherData)]
    );

    // Respond with success
    res.status(201).json({ message: 'Successfully entered competition.', entryId: result.insertId });
  } catch (error) {
    console.error('Error entering competition:', error);
    res.status(500).json({ message: 'Failed to enter competition.' });
  }
};



module.exports = competeController;