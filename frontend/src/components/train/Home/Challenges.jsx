import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Separator } from "@/components/ui/separator";
import CheckBoxes from './CheckBoxes'; 
import { Button } from '../../ui/button';
import api from '@/components/shared/api';
import { FiRefreshCw, FiCheck } from 'react-icons/fi';
import { skillsData } from '@/components/shared/skillsData';
import { Toaster, toast } from 'sonner';
import { useAuth } from '@/components/shared/auth/AuthProvider';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [checkedChallenges, setCheckedChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setChallenges(
          [{"skill":"lunge","repsOrSeconds":10},
          {"skill":"jump-lunge","repsOrSeconds":15},
          {"skill":"negative-pullup","repsOrSeconds":20}]
        )
        setLoading(false);
      return;
    }

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

  const handleReroll = async () => {
    try {
      setLoading(true);
      const { data } = await api.post('/user/rerollChallenges');
      setChallenges(data.challenges || []);
      setCheckedChallenges([]);
    } catch (error) {
      console.error('Error rerolling challenges:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (checkedChallenges.length === 0) {
      alert('Please select at least one challenge before submitting.');
      return;
    }

    if (!token) {
      toast('Sign In to Submit Challenges');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/user/submitChallenges', { checkedChallenges: checkedChallenges });
      console.log('Submission successful:', response.data);
      toast.success('Challenges Submitted!');
      setCheckedChallenges([]);
    } catch (error) {
      console.error('Error submitting challenges:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-black text-white border shadow-lg rounded-lg overflow-hidden">
      <Toaster />
      <div className="px-6 py-5 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Challenges</h2>
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
            disabled={loading || checkedChallenges.length === 0}
          >
            <FiCheck className="mr-2" />
            Submit
          </Button>
        </div>
      </div>
      <Separator className="bg-gray-800" />
      <CardContent className="pt-6 pb-8 px-6">
        {error ? (
          <div className="text-red-400 text-center py-4">Session Expired. Please Refresh.</div>
        ) : loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-5 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <CheckBoxes 
            challenges={challenges}
            checkedChallenges={checkedChallenges}   
            onCheck={setCheckedChallenges}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default Challenges;
