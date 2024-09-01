import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSkillContext } from '../SkillContext';

const CustomNode = memo(({ data }) => {
  const [skills, setSkills] = useState(data.skills);
  const { updateSkillStatus } = useSkillContext();

  const handleStatusChange = (id, newStatus) => {
    // Update the status locally in the state
    const updatedSkills = skills.map((skill) => 
      skill.id === id ? { ...skill, status: newStatus } : skill
    );
    setSkills(updatedSkills);  // Trigger a re-render with the new status
  
    // Update the status in the context (which might also update the backend)
    updateSkillStatus(id, newStatus);
  };

  return (
    <div className="custom-node p-4 rounded-lg bg-black text-white border border-gray-800 shadow-lg overflow-hidden">
      <Handle type="target" position={Position.Top} />
      <div className="node-content">
        <h3 className="text-lg mb-3 font-semibold border-b border-gray-800 pb-2">{data.category}</h3>
        {skills.map((skill) => (
          <div key={skill.id} className="skill-row flex items-center justify-between mb-2">
            <span className="skill-label text-sm text-gray-400 mr-4">{skill.label}</span>
            <RadioGroup 
              value={getSkillStatusValue(skill.status)} 
              onValueChange={(value) => handleStatusChange(skill.id, getSkillStatusFromValue(value))}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center">
                <RadioGroupItem 
                  value="uncompleted" 
                  id={`${skill.id}-uncompleted`}
                  className="w-4 h-4 border-2 border-gray-700 text-gray-600 focus:border-gray-500"
                />
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="current" 
                  id={`${skill.id}-current`}
                  className="w-4 h-4 border-2 border-gray-500 text-gray-400 focus:border-gray-300"
                />
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="completed" 
                  id={`${skill.id}-completed`}
                  className="w-4 h-4 border-2 border-gray-300 text-white focus:border-gray-100"
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

const getSkillStatusValue = (status) => {
  switch (status) {
    case 1: return 'completed';
    case 2: return 'current';
    case 3:
    default: return 'uncompleted';
  }
};

const getSkillStatusFromValue = (value) => {
  switch (value) {
    case 'completed': return 1;
    case 'current': return 2;
    case 'uncompleted':
    default: return 3;
  }
};

CustomNode.displayName = 'CustomNode';

export default CustomNode;