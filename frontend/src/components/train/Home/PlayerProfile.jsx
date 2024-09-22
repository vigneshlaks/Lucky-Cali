import React, { useEffect, useState } from 'react';
import RadarChart from "./RadarChart";
import Killua from "../../../assets/killua.jpg";
import api from '@/components/shared/api'; // Ensure your API configuration is correctly imported
import { useAuth } from '@/components/shared/auth/AuthProvider';

const PlayerProfile = () => {
  const [experience, setExperience] = useState(0); // Adjust state to handle experience as a number
  const [rank, setRank] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {token} = useAuth();

  // Fetch player data from the backend when the component mounts
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        var data = null
        // Fetch data from the backend endpoint /user/stats
        if (token) {
          data = await api.get('/user/stats');
        }
        console.log(data);
        // Update state with the received experience and rank data
        if (data) {
          setExperience(data.experience || 0);
          setRank(data.rank || 0);
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, []);

  // Display loading state
  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  // Display error message if there was an issue fetching data
  if (error) {
    return (
      <div className="text-center text-red-500">
        Error fetching data: {error.message || 'Something went wrong'}
      </div>
    );
  }

  // Main content of the Player Profile component
  return (
    <div className="bg-black text-white border shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
      <div className="px-6 py-5 flex justify-between items-center border-b border-gray-800">
        <h2 className="text-2xl font-bold">Player Profile</h2>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-medium">Experience:</div>
            <div className="flex items-center">
              <div className="text-white text-lg font-medium">{experience}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-white text-lg font-medium">Rank:</div>
            <div className="text-white text-lg font-medium">{rank}</div>
          </div>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-1/2 flex items-center justify-center">
          <div className="p-8">
            <img src={Killua} alt="Killua" className="h-full max-h-full object-cover rounded" />
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <RadarChart />
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
