/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import api from './api';

const ObjectivesContext = createContext();

export const ObjectivesProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserObjectives = async () => {
      try {
      const { data } = await api.get('/user/objectives');

        setGoals(data.goals || []);
        
        setChallenges(data.challenges || []);

      } catch (error) {
        console.error("Error fetching user objectives:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserObjectives();
  }, []);

  return (
    <ObjectivesContext.Provider value={{ goals, challenges, loading, error }}>
      {children}
    </ObjectivesContext.Provider>
  );
};

export const useObjectivesContext = () => {
  const context = useContext(ObjectivesContext);
  if (!context) {
    throw new Error('useObjectivesContext must be used within an ObjectivesProvider');
  }
  return context;
};
