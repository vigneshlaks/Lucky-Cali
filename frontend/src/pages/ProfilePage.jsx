/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import SkillTreeFlow from '@/components/shared/skills/SkillTreeFlow';
import RadarChart from '@/components/train/Home/RadarChart/RadarChart';
import api from '@/components/shared/api'; // Assuming your API configuration is here
import { skillsData } from '@/components/shared/skillsData';

const PlayerProfile = ({ skills }) => {
  const unlockedSkills = skills.filter(skill => skill.status === 1).length;
  const currentSkills = skills.filter(skill => skill.status === 2).length;
  const lockedSkills = Object.values(skillsData).reduce((count, category) => {
    // Count all skills in skillsData that are not in the user's skills array
    const unseenSkills = category.nodes.filter(skill => 
      !skills.some(userSkill => userSkill.skill_id === skill.id)
    ).length;
  
    // Count all skills in skills array that have status 3 (locked)
    const lockedSkillsInCategory = skills.filter(skill => 
      skill.status === 3 && category.nodes.some(node => node.id === skill.skill_id)
    ).length;
  
    // Add both unseen skills and locked skills to the count
    return count + unseenSkills + lockedSkillsInCategory;
  }, 0);

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

const CalisthenicsProfile = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get('/user/skills');
        setSkills(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
        setError('Failed to load skills');
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleStatusChange = async (skillId, newStatus) => {
    try {
      if (newStatus !== 3) {
        await api.put(`/user/skills/${skillId}`, { status: newStatus });
      }

      console.table(skills);
  
      // Update the local state, adding the skill if it's not already in the array
      setSkills(prevSkills => {
        const skillExists = prevSkills.some(skill => skill.skill_id === skillId);
  
        if (skillExists) {
          // Update the status of the existing skill
          return prevSkills.map(skill =>
            skill.skill_id === skillId ? { ...skill, status: newStatus } : skill
          );
        } else {
          // Add the new skill to the array
          return [...prevSkills, { skill_id: skillId, status: newStatus }];
        }
      });
  
      console.table(skills);
  
    } catch (error) {
      console.error('Failed to update skill status:', error);
      // Optionally, you can set an error state or show a notification to the user
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        <div className="flex flex-col space-y-4 lg:col-span-2">
          <SkillTreeFlow skills={skills} onStatusChange={handleStatusChange}/>
        </div>
        <div className="flex flex-col lg:col-span-1">
          <PlayerProfile skills={skills} />
        </div>
      </div>
    </div>
  );
};

export default CalisthenicsProfile;
