import React, { useEffect, useState } from 'react';
import api from '@/components/shared/api';

const Leaderboard = ({ title, players }) => {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-black text-white">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white">{title}</h1>
          </header>
          <div className="bg-black rounded-lg overflow-hidden border border-white">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-black text-white border-b border-white">
                  <th className="px-4 py-3 text-left font-medium">Rank</th>
                  <th className="px-4 py-3 text-left font-medium">Player</th>
                  <th className="px-4 py-3 text-right font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={index} className="border-b border-white even:bg-black">
                    <td className="px-4 py-3 font-medium">{index + 1}</td>
                    <td className="px-4 py-3">{player.name}</td>
                    <td className="px-4 py-3 text-right">{player.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const LeaderboardPage = () => {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const playersPerPage = 5;

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/compete/leaderboard`, {
          params: { page: currentPage, limit: playersPerPage }
        });
        console.log("Response: " + response.data);
        setPlayers(response.data.players);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <>
          <Leaderboard title="Leaderboard" players={players} />
          <div className="flex justify-center my-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-white mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderboardPage;
