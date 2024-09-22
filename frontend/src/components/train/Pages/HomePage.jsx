import CheckIn from '@/components/train/Home/CheckIn';
import Challenges from '@/components/train/Home/Challenges';
import WorkoutLog from '@/components/train/Home/WorkoutLog';
import PlayerProfile from '@/components/train/Home/PlayerProfile';

const TrainHomePage = () => {
  return (
    <div className="h-[95vh]">
      <div className="h-full bg-black text-white p-5">
        <div className="h-full flex gap-4">
          <div className="flex-1 space-y-5 h-full flex flex-col overflow-hidden">
            <div className="">
              <Challenges />
            </div>
            <div className="flex-grow overflow-auto">
              <PlayerProfile />
            </div>
          </div>
          <div className="flex-1 h-full overflow-auto">
            <WorkoutLog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainHomePage;
