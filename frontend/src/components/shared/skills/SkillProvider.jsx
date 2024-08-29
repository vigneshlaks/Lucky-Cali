import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const CompletedSkillsContext = createContext();

// eslint-disable-next-line react/prop-types
export const CompletedSkillsProvider = ({ children }) => {
  const [completedSkills, setCompletedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedSkills = async () => {
      try {
        let { data } = await api.get('/user/completed-skills');
    
        // Check if completedSkills is an array and has elements
        if (Array.isArray(data) && data.length > 0) {

          const skillIdList = data.map(skill => skill.skill_id);
    
          setCompletedSkills(skillIdList);
        } else {
          console.log("No completed skills found for the user.");
        }
      } catch (error) {
        // Handle and log the error
        console.error("Error fetching completed skills:", error);
        setError(error);
      } finally {
        // Ensure loading state is set to false
        setLoading(false);
      }
    };

    fetchCompletedSkills();
  }, []);

  return (
    <CompletedSkillsContext.Provider value={{ completedSkills, loading, error }}>
      {children}
    </CompletedSkillsContext.Provider>
  );
};

export const useCompletedSkills = () => {
  const context = useContext(CompletedSkillsContext);
  if (!context) {
    throw new Error('useCompletedSkills must be used within a CompletedSkillsProvider');
  }
  return context;
};
