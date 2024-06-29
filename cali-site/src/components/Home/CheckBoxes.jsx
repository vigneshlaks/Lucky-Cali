import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from "@/components/ui/checkbox";

const CheckBoxes = ({ challenges }) => {
  return (
    <div className="space-y-4 mt-4">
      {challenges.map((challenge) => (
        <div key={challenge.id} className="flex items-center space-x-2">
          <Checkbox id={`challenge-${challenge.id}`} className="text-black text-2xl" />
          <label
            htmlFor={`challenge-${challenge.id}`}
            className="text-1xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {challenge.title}
          </label>
        </div>
      ))}
    </div>
  );
};

CheckBoxes.propTypes = {
  challenges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CheckBoxes;
