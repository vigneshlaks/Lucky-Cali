import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from "@/components/ui/checkbox";

const CheckBoxes = ({ challenges }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {challenges.map((challenge, index) => (
        <div key={index} className="flex items-center">
          <Checkbox id={`challenge-${index}`} className="text-2xl text-white border-white" />
          <label
            htmlFor={`challenge-${index}`}
            className="ml-2 text-sm font-medium leading-none"
          >
            {challenge}
          </label>
        </div>
      ))}
    </div>
  );
};

CheckBoxes.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CheckBoxes;
