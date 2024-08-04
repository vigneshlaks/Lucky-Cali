import PropTypes from 'prop-types';

const LogCard = ({ title, content, author, date }) => {
  return (
    <div className="flex flex-col w-full border rounded-lg border-white p-4">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-2">{content}</p>
      <div className="border-t border-white mt-2"></div>
      <div className="flex justify-between text-sm text-gray-400 mt-2">
        <span>{author}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

LogCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

const WorkoutLogPage = () => {
  // Directly include the log data
  const logs = [
    { id: 1, title: 'Morning Workout', content: 'Ran 5 miles.', author: 'John Doe', date: '2024-07-01' },
    { id: 2, title: 'Afternoon Yoga', content: '1-hour yoga session.', author: 'Jane Smith', date: '2024-07-01' },
    { id: 3, title: 'Evening Gym', content: 'Weight lifting session.', author: 'John Doe', date: '2024-07-01' },
  ];

  return (
    <div className="bg-black text-white min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-6">Workout Logs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logs.map(log => (
          <LogCard key={log.id} {...log} />
        ))}
      </div>
    </div>
  );
};

export default WorkoutLogPage;
