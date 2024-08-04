import React from 'react';
import LogCard from '../Logs/LogCard';

const WorkoutLogPage = () => {
  // Directly include the log data
  const logs = [
    { id: 1, title: 'Morning Workout', content: 'Ran 5 miles.', author: 'John Doe', date: '2024-07-01' },
    { id: 2, title: 'Afternoon Yoga', content: '1-hour yoga session.', author: 'Jane Smith', date: '2024-07-01' },
    { id: 3, title: 'Evening Gym', content: 'Weight lifting session.', author: 'John Doe', date: '2024-07-01' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Workout Logs</h1>
      <div className="grid grid-cols-1 gap-4">
        {logs.map(log => (
          <LogCard key={log.id} log={log} />
        ))}
      </div>
    </div>
  );
};

export default WorkoutLogPage;
