import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/components/shared/api'; // Ensure your API client is correctly configured
import { useAuth } from './auth/AuthProvider';
// Create the Skill Context
const SkillContext = createContext();

// Custom hook to use the Skill Context
export const useSkillContext = () => useContext(SkillContext);

const defaultSkills = [
  {
      "user_skill_id": 2,
      "user_id": 4,
      "skill_id": "free-hs",
      "acquired_at": "2024-08-22T05:53:42.000Z",
      "status": 1
  },
  {
      "user_skill_id": 20,
      "user_id": 4,
      "skill_id": "negative-pullup",
      "acquired_at": "2024-09-01T21:33:15.000Z",
      "status": 2
  },
  {
      "user_skill_id": 25,
      "user_id": 4,
      "skill_id": "tuck-planche",
      "acquired_at": "2024-09-01T21:34:00.000Z",
      "status": 1
  },
  {
      "user_skill_id": 27,
      "user_id": 4,
      "skill_id": "jump-lunge",
      "acquired_at": "2024-09-01T21:52:38.000Z",
      "status": 2
  },
  {
      "user_skill_id": 31,
      "user_id": 4,
      "skill_id": "tucked-row",
      "acquired_at": "2024-09-01T21:53:42.000Z",
      "status": 3
  },
]

// SkillProvider component to wrap parts of the app that need skill data access
export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Function to fetch all skills from the backend
  const fetchAllSkills = async () => {
    try {
      setLoading(true);
      if (token) {
        const response = await api.get('user/all-skills');
        console.log(response)
        setSkills(response.data);
      } else {
        setSkills(defaultSkills);
      }
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
