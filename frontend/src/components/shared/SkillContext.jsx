import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/components/shared/api'; // Ensure your API client is correctly configured

// Create the Skill Context
const SkillContext = createContext();

// Custom hook to use the Skill Context
export const useSkillContext = () => useContext(SkillContext);

// SkillProvider component to wrap parts of the app that need skill data access
export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]); // State to hold all skills
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all skills from the backend
  const fetchAllSkills = async () => {
    try {
      setLoading(true);
      const response = await api.get('user/all-skills');
      setSkills(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching all skills:', err);
      setError(err);
      setLoading(false);
    }
  };

  // Function to update the status of a specific skill
  const updateSkillStatus = async (skillId, newStatus) => {
    try {
      // Make an API call to update the skill status
      await api.put(`user/skills/${skillId}`, { status: newStatus });
      // Update the local state to reflect the change
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.skill_id === skillId ? { ...skill, status: newStatus } : skill
        )
      );
    } catch (err) {
      console.error('Error updating skill status:', err);
      setError(err);
    }
  };

  // Effect to fetch all skills on initial render
  useEffect(() => {
    fetchAllSkills();
  }, []);

  return (
    <SkillContext.Provider
      value={{
        skills,
        loading,
        error,
        fetchAllSkills,
        updateSkillStatus,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};
