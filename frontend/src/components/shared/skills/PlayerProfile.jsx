import { skillsData } from "../skillsData";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import RadarChart from '@/components/train/Home/RadarChart/RadarChart';

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
    console.log(unlockedSkillIds);
  
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
            <RadarChart />
          </div>
        </CardContent>
      </Card>
    );
  };

  export default PlayerProfile;