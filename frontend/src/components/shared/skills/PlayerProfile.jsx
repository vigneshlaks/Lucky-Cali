import React from 'react';
import { skillsData } from "../skillsData";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import RadarChart from '@/components/train/Home/RadarChart/RadarChart';
import { useSkillContext } from '../SkillContext';

const PlayerProfile = () => {
  // Use the context to access skills, loading, and error states
  const { skills, loading, error } = useSkillContext();

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading skills: {error.message}</p>;

  // Calculate skill counts
  const unlockedSkills = skills.filter(skill => skill.status === 1).length;
  const currentSkills = skills.filter(skill => skill.status === 2).length;

  // Calculate locked skills based on skillsData and current skills
  const lockedSkills = Object.values(skillsData).reduce((count, category) => {
    const unseenSkills = category.nodes.filter(skill =>
      !skills.some(userSkill => userSkill.skill_id === skill.id)
    ).length;

    const lockedSkillsInCategory = skills.filter(skill =>
      skill.status === 3 && category.nodes.some(node => node.id === skill.skill_id)
    ).length;

    return count + unseenSkills + lockedSkillsInCategory;
  }, 0);

  // Get the IDs of unlocked skills
  const unlockedSkillIds = skills
    .filter(skill => skill.status === 1)
    .map(skill => skill.skill_id);

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
      <CardContent className="px-6 py-4">
        <div className="flex justify-center">
          <RadarChart completedSkills={unlockedSkillIds} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerProfile;
