/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import SkillTreeFlow from '@/components/shared/skills/SkillTreeFlow';
import api from '@/components/shared/api'; // Assuming your API configuration is here



const CalisthenicsProfile = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get('/user/all-skills');
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

    } catch (error) {
      console.error('Failed to update skill status:', error);
      // Optionally, you can set an error state or show a notification to the user
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className="w-full h-full" style={{ height: '100vh', backgroundColor: '#000' }}>
      <SkillTreeFlow skills={skills} onStatusChange={handleStatusChange}/>
    </div>
  );
};

export default CalisthenicsProfile;
