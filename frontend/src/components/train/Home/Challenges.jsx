import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Separator } from "@/components/ui/separator";
import CheckBoxes from './CheckBoxes';
import { Button } from '../../ui/button';
import api from '@/components/shared/api';
import { skillsData } from '@/components/shared/skillsData';

const generateRepsOrSeconds = (skillId) => {
  let skill = null;

  // Find the skill in skillsData
  for (const category in skillsData) {
    skill = skillsData[category].nodes.find(node => node.id === skillId);
    if (skill) break;
  }

  if (!skill) return 'N/A'; // Return 'N/A' if the skill is not found

  let value;
  if (skill.type === 'static') {
    // For static skills, generate seconds in increments of 5
    value = `${Math.floor(Math.random() * 6) * 5 + 10} second ${skill.label.toLowerCase()}`;
  } else if (skill.type === 'dynamic') {
    // For dynamic skills, generate reps in increments of 5
    value = `${Math.floor(Math.random() * 3) * 5 + 5} ${skill.label.toLowerCase()} reps`;
  }

  return value;
};

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data } = await api.get('/user/challenges');
        const updatedChallenges = data.challenges.map(skillId => generateRepsOrSeconds(skillId));
        setChallenges(updatedChallenges || []);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleReroll = async () => {
    try {
      setLoading(true);
      const { data } = await api.post('/user/rerollChallenges'); // Assuming this is the correct endpoint
      const updatedChallenges = data.challenges.map(skillId => generateRepsOrSeconds(skillId));
      setChallenges(updatedChallenges || []);
    } catch (error) {
      console.error('Error rerolling challenges:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting challenges...');
  };

  return (
    <Card className="bg-black text-white">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Weekly Challenges</h2>
        <div>
          <Button variant="ringHover" className="mr-2" onClick={handleReroll}>Reroll</Button>
          <Button variant="ringHover" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
      <Separator />
      <CardContent className="pt-4">
        {error ? (
          <div>Error: {error.message}</div>
        ) : (
          <CheckBoxes challenges={loading ? Array(3).fill('Loading...') : challenges} />
        )}
      </CardContent>
    </Card>
  );
}

export default Challenges;
