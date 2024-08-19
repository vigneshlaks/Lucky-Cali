import CheckIn from '@/components/train/Home/CheckIn';
import Challenges from '@/components/train/Home/Challenges';
import WorkoutLog from '@/components/train/Home/WorkoutLog';
import PlayerProfile from '@/components/train/Home/PlayerProfile';

const HomePage = () => {
  return (
    <div className="bg-black text-white min-h-screen p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4">
            <Challenges />
            <WorkoutLog />
          </div>
          <div className="flex flex-col space-y-4">
          <CheckIn />
          <PlayerProfile />
    </div>
      </div>
    </div>
  );
};

export default HomePage;
