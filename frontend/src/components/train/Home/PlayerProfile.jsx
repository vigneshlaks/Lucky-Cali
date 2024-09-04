import RadarChart from "./RadarChart/RadarChart";
import gojoPNG from "../../../assets/gojo.jpg";

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
      <div className="flex-grow flex p-0">
        <div className="flex-1 flex items-center justify-center p-11">
          <div className="text-center">
            <img src={gojoPNG} alt="Gojo" className="" />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full h-full max-w-[300px] max-h-[300px]">
            <RadarChart />
          </div>
          </div>
        </div>
    </div>
  );
};

export default PlayerProfile;
