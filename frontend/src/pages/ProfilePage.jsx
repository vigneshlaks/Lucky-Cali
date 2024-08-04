import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SkillTreeFlow from '@/components/shared/skills/SkillTreeFlow';
import RadarChart from '@/components/train/Home/RadarChart/RadarChart';

const PlayerProfile = () => {
  const unlockedSkills = 5;
  const currentSkills = 3;
  const lockedSkills = 10;

  return (
    <div className='flex flex-col w-full border rounded-lg border-white'>
      <div className='flex w-full'>
        <div className='flex-1 flex flex-col items-center justify-center p-4'>
          <div className='text-white text-md font-semibold'>Unlocked Skills</div>
          <div className='text-white text-2xl'>{unlockedSkills}</div>
        </div>
        <div className='border-l border-white'></div>
        <div className='flex-1 flex flex-col items-center justify-center p-4'>
          <div className='text-white text-md font-semibold'>Current Skills</div>
          <div className='text-white text-2xl'>{currentSkills}</div>
        </div>
        <div className='border-l border-white'></div>
        <div className='flex-1 flex flex-col items-center justify-center p-4'>
          <div className='text-white text-md font-semibold'>Locked Skills</div>
          <div className='text-white text-2xl'>{lockedSkills}</div>
        </div>
      </div>
      <div className='border-t border-white'></div>
      <div className='flex w-ful h-120'>
          <div className='border-l border-white'></div>
          <div className='flex-1 p-4'>
            <RadarChart />
          </div>
        </div>
      <div className='border-t border-white'></div>
      <div className='flex flex-col p-4 rounded-lg items-center justify-center'>
        <div className='text-white text-md font-semibold'>Comp Rank: </div>
        <div className='text-white text-md font-semibold'>Spectator Rank: </div>


      </div>
    </div>
  );
};

const CalisthenicsProfile = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 p-4">
        <div className="flex flex-col space-y-4 lg:col-span-2">
          <SkillTreeFlow />
        </div>
        <div className="flex flex-col lg:col-span-1">
          <PlayerProfile />
        </div>
      </div>
    </div>
  );
};

export default CalisthenicsProfile;
