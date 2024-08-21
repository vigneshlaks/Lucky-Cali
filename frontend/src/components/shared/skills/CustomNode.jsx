/* eslint-disable react/prop-types */
import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const CustomNode = memo(({ data }) => {
  return (
    <div className="custom-node p-4 rounded-md bg-white border border-gray-200 shadow-md">
      <Handle type="target" position={Position.Top} />
      <div className="node-content">
        <h3 className="text-lg font-bold mb-3 text-gray-800">{data.category}</h3>
        {data.skills.map((skill) => (
          <div key={skill.id} className="skill-row flex items-center justify-between mb-2">
            <span className="skill-label text-sm text-gray-600 mr-4">{skill.label}</span>
            <RadioGroup defaultValue="uncompleted" className="flex items-center space-x-2">
              <div className="flex items-center">
                <RadioGroupItem 
                  value="completed" 
                  id={`${skill.id}-completed`}
                  className="w-4 h-4 border-2 border-blue-500"
                />
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="current" 
                  id={`${skill.id}-current`}
                  className="w-4 h-4 border-2 border-gray-300"
                />
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="uncompleted" 
                  id={`${skill.id}-uncompleted`}
                  className="w-4 h-4 border-2 border-gray-300"
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

CustomNode.displayName = 'CustomNode';

export default CustomNode;