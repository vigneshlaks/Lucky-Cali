import RadarChart from "./RadarChart/RadarChart";
//import { progress } from '@/components/shared/utils';

const PlayerProfile = () => {
  const experience = {
    level: 10,
    progress: 75,
  };

  const rank = 15;

  return (
    <div className="flex flex-col w-full border rounded-lg border-white">
      <div className="flex h-full">
        <div className="flex-1 rounded-lg flex items-center justify-center">
          <div className="text-white text-2xl font-bold">Place Holder</div>
        </div>
        <div className="border-l border-white"></div>
        <div className="flex-1 p-6">
          <RadarChart />
        </div>
      </div>
      <div className="border-t border-white"></div>
      <div className="flex flex-row p-6 rounded-lg items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-white text-lg font-medium">Experience:</div>
          <div className="flex items-center">
            <div className="bg-white rounded-full h-4 w-40 mr-2">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${experience.progress}%` }}
              ></div>
            </div>
            <div className="text-white text-lg">{experience.level}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-white text-lg font-medium">Rank:</div>
          <div className="text-white text-lg">{rank}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;