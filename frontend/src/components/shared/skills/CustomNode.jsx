/* eslint-disable react/prop-types */
import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const CustomNode = memo(({ data }) => {
  // Local state to manage the skills
  const [skills, setSkills] = useState(data.skills);
  const { onStatusChange } = data;

  // Handler to update the status of a skill
  const handleStatusChange = (id, newStatus) => {
    const updatedSkills = skills.map((skill) => 
      skill.id === id ? { ...skill, status: newStatus } : skill
    );
    setSkills(updatedSkills);
    onStatusChange(id, newStatus);
  };

  return (
    <div className="custom-node p-4 rounded-md bg-white border border-gray-200 shadow-md">
      <Handle type="target" position={Position.Top} />
      <div className="node-content">
        <h3 className="text-lg mb-3 text-black">{data.category}</h3>
        {skills.map((skill) => (
          <div key={skill.id} className="skill-row flex items-center justify-between mb-2">
            <span className="skill-label text-sm text-black mr-4">{skill.label}</span>
            <RadioGroup 
              value={getSkillStatusValue(skill.status)} 
              onValueChange={(value) => handleStatusChange(skill.id, getSkillStatusFromValue(value))}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center">
                <RadioGroupItem 
                  value="uncompleted" 
                  id={`${skill.id}-uncompleted`}
                  className="w-4 h-4 border-2 border-gray-300"
                />
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="current" 
                  id={`${skill.id}-current`}
                  className="w-4 h-4 border-2 border-gray-500"
                />
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="completed" 
                  id={`${skill.id}-completed`}
                  className="w-4 h-4 border-2 border-gray-800"
                />
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

// Helper function to get the status value for the RadioGroup
const getSkillStatusValue = (status) => {
  switch (status) {
    case 1:
      return 'completed';
    case 2:
      return 'current';
    case 3:
    default:
      return 'uncompleted';
  }
};

// Helper function to get the status code from the RadioGroup value
const getSkillStatusFromValue = (value) => {
  switch (value) {
    case 'completed':
      return 1;
    case 'current':
      return 2;
    case 'uncompleted':
    default:
      return 3;
  }
};

CustomNode.displayName = 'CustomNode';

export default CustomNode;
