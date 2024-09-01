/* eslint-disable react/prop-types */
import React from 'react';
import SkillTreeFlow from '@/components/shared/skills/SkillTreeFlow';
import { useSkillContext } from '@/components/shared/SkillContext';

const CalisthenicsProfile = () => {
  const { skills, loading, error } = useSkillContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-full" style={{ height: '100vh', backgroundColor: '#000' }}>
      <SkillTreeFlow skills={skills} />
    </div>
  );
};

export default CalisthenicsProfile;
