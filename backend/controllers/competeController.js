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

competeController.submitScore = async (req, res) => {
  const { score } = req.body;
  const userId = req.user.id;

  if (typeof score !== 'number') {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    await db.query('BEGIN');

    // Check if the user already has a score in the leaderboard
    const existingScore = await db.query(
      'SELECT * FROM leaderboard WHERE user_id = $1',
      [userId]
    );

    if (existingScore.rows.length > 0) {
      // Update the existing score
      await db.query(
        'UPDATE leaderboard SET score = $1 WHERE user_id = $2',
        [score, userId]
      );
    } else {
      // Insert a new score entry for the user
      await db.query(
        'INSERT INTO leaderboard (user_id, score) VALUES ($1, $2)',
        [userId, score]
      );
    }

    await db.query('COMMIT');
    res.json({ message: 'Score submitted successfully.' });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Error submitting score:', error);
    res.status(500).json({ message: 'An error occurred while submitting the score.' });
  }
};

module.exports = competeController;


module.exports = competeController;