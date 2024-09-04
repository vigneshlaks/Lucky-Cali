import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Separator } from "@/components/ui/separator";
import CheckBoxes from './CheckBoxes';
import { Button } from '../../ui/button';
import api from '@/components/shared/api';
import { skillsData } from '@/components/shared/skillsData';
import { FiRefreshCw, FiCheck } from 'react-icons/fi';

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
      const { data } = await api.post('/user/rerollChallenges');
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
    <Card className="bg-black text-white border shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-5 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Weekly Challenges</h2>
        <div className="space-x-3">
          <Button
            variant="outline"
            className="border-white hover:bg-white hover:text-black transition-colors duration-200"
            onClick={handleReroll}
            disabled={loading}
          >
            <FiRefreshCw className="mr-2" />
            Reroll
          </Button>
          <Button
            variant="default"
            className="bg-white text-black hover:bg-gray-200 transition-colors duration-200"
            onClick={handleSubmit}
            disabled={loading}
          >
            <FiCheck className="mr-2" />
            Submit
          </Button>
        </div>
      </div>
      <Separator className="bg-gray-800" />
      <CardContent className="pt-6 pb-8 px-6">
        {error ? (
          <div className="text-red-400 text-center py-4">Session Expired Please Refresh</div>
        ) : loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-5 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <CheckBoxes challenges={challenges} />
        )}
      </CardContent>
    </Card>
  );
};

export default Challenges;
