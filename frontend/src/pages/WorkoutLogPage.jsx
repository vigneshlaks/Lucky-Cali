import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '@/components/shared/api'; // Assuming you have a configured Axios instance
import { Link } from 'react-router-dom';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const LogCard = ({ id, title, content, date }) => {
  return (
    <Link to={`/train/logs/${id}`} className="block">
      <div className="bg-gray-950 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-gray-700 hover:scale-105 border border-gray-800">
        <div className="p-6">
          <h3 className="text-2xl font-bold t
          ext-gray-100 mb-3">{title}</h3>
          <p className="text-gray-400 mb-4 text-lg">{truncateText(content, 25)}</p>
        </div>
        <div className="bg-black px-6 py-3 flex justify-end items-center">
          <span className="text-sm text-gray-500">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  );
};

LogCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

LogCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

const WorkoutLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('train/logs');
        console.log(response.data);
        setLogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workout logs:", error);
        setError('Failed to fetch workout logs');
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <div className="bg-black text-white min-h-screen p-8 flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="bg-black text-white min-h-screen p-8 flex justify-center items-center">{error}</div>;
  }

  if (logs.length === 0) {
    return <div className="bg-black text-white min-h-screen p-8 flex justify-center items-center">No workout logs available.</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Workout Logs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.map(log => (
            <LogCard key={log.id} id ={log.id} title={log.title} content={log.description} date={log.date} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutLogPage;
