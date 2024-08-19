exports.getWeeklyChallenges = (req, res) => {
    const challenges = [
      { id: 1, challenge: "Complete 100 Push-Ups" },
      { id: 2, challenge: "Run 5 Miles" },
      { id: 3, challenge: "Meditate for 10 Minutes" }
    ];
    res.json(challenges);
  };

  // Workout Log controller functions
  exports.submitWorkoutLog = (req, res) => {
    const { title, description, date } = req.body;
    console.log('Received workout log:', { title, description, date });
    res.json({ success: true, message: "Workout log submitted successfully." });
  };

exports.getWorkoutLogs = (req, res) => {
  const logs = [
    { id: 1, title: "16-7-2024 Workout Log", description: "Focused on strength training.", date: "2024-07-16" },
    { id: 2, title: "15-7-2024 Workout Log", description: "Cardio and flexibility exercises.", date: "2024-07-15" }
  ];
  res.json(logs);
};
