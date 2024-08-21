import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import SkillTreeFlow from '@/components/shared/skills/SkillTreeFlow';
import RadarChart from '@/components/train/Home/RadarChart/RadarChart';

const PlayerProfile = () => {
  const unlockedSkills = 5;
  const currentSkills = 3;
  const lockedSkills = 10;

  return (
    <Card className="bg-black text-white border shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="px-6 py-4 border-b border-gray-800">
        <CardTitle>Player Profile</CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <div className="text-md font-medium">Unlocked Skills</div>
            <div className="text-2xl">{unlockedSkills}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-md font-medium">Current Skills</div>
            <div className="text-2xl">{currentSkills}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-md font-medium">Locked Skills</div>
            <div className="text-2xl">{lockedSkills}</div>
          </div>
        </div>
      </CardContent>
      <div className="border-t border-gray-800"></div>
      <CardContent className="px-6 py-4">
        <div className="flex justify-center">
          <RadarChart />
        </div>
      </CardContent>
      <div className="border-t border-gray-800"></div>
      <CardContent className="px-6 py-4 flex flex-col items-center">
        <div className="text-md font-medium">Comp Rank:</div>
        <div className="text-md font-medium">Spectator Rank:</div>
      </CardContent>
    </Card>
  );
};

const CalisthenicsProfile = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
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