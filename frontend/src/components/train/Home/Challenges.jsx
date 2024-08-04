import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Separator } from "@/components/ui/separator";
import CheckBoxes from './CheckBoxes';
import { Button } from '../../ui/button';
import api from '@/components/shared/api';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data } = await api.get('/user/challenges');
        setChallenges(data.challenges || []);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleReroll = () => {
    console.log('Rerolling challenges...');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (challenges.length !== 3) return <div>Error: Unexpected number of challenges.</div>;

  return (
    <Card className="bg-black text-white">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Weekly Challenges</h2>
        <Button variant="ringHover" onClick={handleReroll}>Reroll</Button>
      </div>
      <Separator />
      <CardContent className="pt-4">
        <CheckBoxes challenges={challenges} />
      </CardContent>
    </Card>
  );
}

export default Challenges;
