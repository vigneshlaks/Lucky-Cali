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

  // Workout Stats controller functions
  exports.getHeatmapData = (req, res) => {
    const heatmapData = {
      "2023": { "07": 10, "08": 15, "09": 20, "10": 25, "11": 30, "12": 35 },
      "2024": { "01": 5, "02": 10, "03": 15, "04": 20, "05": 25, "06": 30 }
    };
    res.json(heatmapData);
  };

  exports.getRadarChartData = (req, res) => {
    const radarData = {
      balance: 4,
      endurance: 5,
      push: 3,
      pull: 2,
      core: 4,
      flexibility: 3
    };
    res.json(radarData);
  };