import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from "@/components/ui/checkbox";
import { skillsData } from '@/components/shared/skillsData'; 
import Challenges from './Challenges';

const getSkillDetails = (skillId) => {
  for (const category in skillsData) {
    const skill = skillsData[category].nodes.find(node => node.id === skillId);
    if (skill) {
      return skill;
    }
  }
  return null;
};

const formatChallengeLabel = (challenge) => {
  const skillDetails = getSkillDetails(challenge.skill);

  if (!skillDetails) {
    return `${challenge.skill}: ${challenge.repsOrSeconds}`; // Fallback if the skill is not found
  }

  const skillLabel = skillDetails.label;
  const skillType = skillDetails.type;
  const repsOrSecondsText = skillType === 'static' 
    ? `${challenge.repsOrSeconds} seconds` 
    : `${challenge.repsOrSeconds} reps`;

  return `${skillLabel}: ${repsOrSecondsText}`;
};

const CheckBoxes = ({ challenges, checkedChallenges, onCheck }) => {

  const handleCheckboxChange = (challenge) => {

    if (!checkedChallenges.some(checked => checked.skill === challenge.skill)) {

      const updatedChallenges = [...checkedChallenges, challenge];

      onCheck(updatedChallenges);
    } else {

      const updatedChallenges = checkedChallenges.filter(
        checked => checked.skill !== challenge.skill
      );

      onCheck(updatedChallenges);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {challenges.map((challenge, index) => (
        <div key={index} className="flex items-center">
          <Checkbox
            id={`challenge-${index}`}
            className=" border-white"
            checked={checkedChallenges.some(checked => checked.skill === challenge.skill)}
            onCheckedChange={(checked) => handleCheckboxChange(challenge)}
          />
          <label
            htmlFor={`challenge-${index}`}
            className="ml-2 text-l font-medium leading-none text-white"
          >
            {formatChallengeLabel(challenge)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxes;
