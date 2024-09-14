import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '@/components/shared/api'; // Assuming you have a configured Axios instance
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/shared/auth/AuthProvider';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const LogCard = ({ id, title, content, date }) => {
  return (
    <Link to={`/train/logs/${id}`} className="block">
      <div className="bg-gray-950 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-gray-700 hover:scale-105 border border-gray-800">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-100 mb-3">{title}</h3>
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

const WorkoutLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const logsPerPage = 6; // Number of logs per page
  const { token } = useAuth();

  // Sample logs to use when the user is not logged in
  const sampleLogs = [
    {
      id: 1,
      user_id: 0,
      title: 'Sample Workout 1',
      description: 'This is a sample workout log for demonstration purposes.',
      date: '2024-09-01T10:00:00Z',
      created_at: '2024-09-01T09:00:00Z',
      updated_at: '2024-09-01T09:30:00Z',
    },
  ];

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        if (token) {
          // Fetch real logs when the user is logged in
          const response = await api.get(`/train/logs?page=${currentPage}&limit=${logsPerPage}`);
          setLogs(response.data.logs);
          setTotalPages(response.data.totalPages);
        } else {
          setLogs(sampleLogs);
          setTotalPages(1); // Set total pages to 1 for sample data
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workout logs:', error);
        setError('Failed to fetch workout logs');
        setLoading(false);
      }
    };

    fetchLogs();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
        <h1 className="text-4xl font-bold mb-8 text-center">Logs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.map((log) => (
            <LogCard key={log.id} id={log.id} title={log.title} content={log.description} date={log.date} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            disabled={currentPage === 1}
          >
            &larr; Previous
          </button>
          <div className="flex items-center space-x-2">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 ${
                  currentPage === page + 1
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {page + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            disabled={currentPage === totalPages}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutLogPage;
