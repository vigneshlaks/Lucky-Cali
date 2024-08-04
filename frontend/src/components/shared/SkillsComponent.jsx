import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { skillsData } from './skillsData';

const SkillsComponent = () => {
  const [unlockedSkills, setUnlockedSkills] = useState({});

  const handleSkillToggle = (skillId) => {
    setUnlockedSkills(prev => ({
      ...prev,
      [skillId]: !prev[skillId]
    }));
  };

  const renderSkillCategory = (category, skills) => (
    <div key={category} className="mb-6">
      <h3 className="text-lg font-semibold mb-2 capitalize">{category}</h3>
      {skills.map(skill => (
        <div key={skill.id} className="flex items-center space-x-2 mb-1">
          <Checkbox
            id={skill.id}
            checked={unlockedSkills[skill.id] || false}
            onCheckedChange={() => handleSkillToggle(skill.id)}
          />
          <Label
            htmlFor={skill.id}
            className={`text-sm ${unlockedSkills[skill.id] ? 'text-green-500' : 'text-gray-300'}`}
          >
            {skill.label} (Level {skill.level})
          </Label>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="bg-gray-800 text-white">
      <CardHeader>
        <CardTitle>My Skills</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(skillsData).map(([category, data]) =>
          renderSkillCategory(category, data.nodes)
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsComponent;