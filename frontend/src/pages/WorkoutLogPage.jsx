import PropTypes from 'prop-types';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const LogCard = ({ title, content, date }) => {
  return (
    <div className="bg-black rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-white hover:scale-105 border border-white">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white mb-4 text-lg">{truncateText(content, 70)}</p> {/* Truncate content to 100 characters */}
      </div>
      <div className="bg-white px-6 py-3 flex justify-end items-center">
        <span className="text-sm text-black">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
    </div>
  );
};

LogCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

const WorkoutLogPage = () => {
  const logs = [
    { id: 1, title: 'Morning Workout', content: 'Ran 5 miles and did some stretching exercis sdafsdfsdfsdafasasdfsadfsadfsdafsadf sdfas f sadf saf asdf asd asfd asd fasdf asd fasd fad fas asdf as fsad fads', date: '2024-07-01' },
    { id: 2, title: 'Afternoon Yoga', content: '1-hour intensive yoga session focusing on flexibility and balance.', date: '2024-07-01' },
    { id: 3, title: 'Evening Gym', content: 'Weight lifting session targeting upper body and core muscles.', date: '2024-07-01' },
  ];

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Workout Logs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.map(log => (
            <LogCard key={log.id} title={log.title} content={log.content} date={log.date} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutLogPage;