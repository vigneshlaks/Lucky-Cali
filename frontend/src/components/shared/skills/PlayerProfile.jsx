import React from 'react';
import { skillsData } from "../skillsData";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import RadarChart from '@/components/train/Home/RadarChart';
import { useSkillContext } from '../SkillContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const PlayerProfile = () => {
  const { logout } = useAuth();
  const { skills, loading, error } = useSkillContext();
  const navigate = useNavigate(); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading skills: {error.message}</p>;

  const unlockedSkills = skills.filter(skill => skill.status === 1).length;
  const currentSkills = skills.filter(skill => skill.status === 2).length;

  const lockedSkills = Object.values(skillsData).reduce((count, category) => {
    const unseenSkills = category.nodes.filter(skill =>
      !skills.some(userSkill => userSkill.skill_id === skill.id)
    ).length;

    const lockedSkillsInCategory = skills.filter(skill =>
      skill.status === 3 && category.nodes.some(node => node.id === skill.skill_id)
    ).length;

    return count + unseenSkills + lockedSkillsInCategory;
  }, 0);

  
  const unlockedSkillIds = skills
    .filter(skill => skill.status === 1)
    .map(skill => skill.skill_id);

  const handleSignOut = async () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <Card className="bg-black text-white border shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="flex flex-col items-start px-6 py-4 border-b border-gray-800 space-y-2 items-center text-center">
        <CardTitle className="self-stretch">Player Profile</CardTitle>
        <Button
          variant="ringHoverRed"
          className="font-normal"
          size="sm"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium">Unlocked Skills</div>
            <div className="text-2xl">{unlockedSkills}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium">Current Skills</div>
            <div className="text-2xl">{currentSkills}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium">Locked Skills</div>
            <div className="text-2xl">{lockedSkills}</div>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div className="flex justify-center items-center min-h-[200px]">
          <RadarChart completedSkills={unlockedSkillIds} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerProfile;