import RadarChart from "./RadarChart";
import Killua from "../../../assets/killua.jpg";

const PlayerProfile = () => {
  const experience = {
    level: 10,
    progress: 75,
  };

  const rank = 15;

  return (
    <div className="bg-black text-white border shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-5 flex justify-between items-center border-b border-gray-800">
        <h2 className="text-2xl font-bold">Player Profile</h2>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-medium">Experience:</div>
            <div className="flex items-center">
              <div className="text-white text-lg">{experience.level}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-white text-lg font-medium">Rank:</div>
            <div className="text-white text-lg">{rank}</div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 flex items-center justify-center">
          <div className="p-8">
            <img src={Killua} alt="Killua" className="h-1000" />
          </div>
        </div>
        <div className="w-1/2 flex items-center p-8 justify-center">
          <RadarChart />
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
