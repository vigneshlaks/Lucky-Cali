import CheckIn from '@/components/Home/CheckIn';
import Challenges from '@/components/Home/Challenges';
import DiaryEntry from '@/components/Home/WorkoutLog';
import PlayerProfile from '@/components/Home/PlayerProfile';

const HomePage = () => {
  return (
    <div className="bg-black text-white min-h-screen p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4">
            <CheckIn />
            <Challenges />
            <DiaryEntry />
          </div>
          <div className="flex flex-col space-y-4">
          <PlayerProfile />
    </div>
      </div>
    </div>

  );
};

export default HomePage;
