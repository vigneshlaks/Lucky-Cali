import CheckIn from '@/components/train/Home/CheckIn';
import Challenges from '@/components/train/Home/Challenges';
import WorkoutLog from '@/components/train/Home/WorkoutLog';
import PlayerProfile from '@/components/train/Home/PlayerProfile';

const TrainHomePage = () => {
  return (
    <div className="bg-black text-white p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-5">
          <Challenges className="flex-grow" />
          <PlayerProfile className="flex-grow" />
        </div>
        <div>
          <WorkoutLog />
        </div>
      </div>
    </div>
  );
};

export default TrainHomePage;
