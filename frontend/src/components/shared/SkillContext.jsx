import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/components/shared/api'; 
import { useAuth } from './auth/AuthProvider';

const SkillContext = createContext();


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


export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  
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

  
  const updateSkillStatus = async (skillId, newStatus) => {
    try {
      await api.put(`user/skills/${skillId}`, { status: newStatus });
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
