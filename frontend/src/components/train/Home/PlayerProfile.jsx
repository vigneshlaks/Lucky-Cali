import React, { useEffect, useState } from 'react';
import RadarChart from "./RadarChart";
import Killua from "../../../assets/killua.jpg";
import api from '@/components/shared/api'; 
import { useAuth } from '@/components/shared/auth/AuthProvider';

const PlayerProfile = () => {
  const [experience, setExperience] = useState(0); 
  const [rank, setRank] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {token} = useAuth();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        var data = null
        if (token) {
          data = await api.get('/user/stats');
        }
        console.log(data);
        if (data != null) {
          console.log("in here")
          console.log(data);
          setExperience(data.data.experience || 0);
          setRank(data.data.rank || 0);
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

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error fetching data: {error.message || 'Something went wrong'}
      </div>
    );
  }

  return (
    <div className="bg-black text-white border shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
      <div className="px-6 py-5 flex justify-between items-center border-b border-gray-800">
        <h2 className="text-2xl font-bold">Player Profile</h2>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-medium">Experience:</div>
            <div className="flex items-center">
              <div className="text-white text-lg font-medium">{experience} xp</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-white text-lg font-medium">Rank: </div>
            <div className="text-white text-lg font-medium">{rank > 0 ? rank : "Unranked"} </div>
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
