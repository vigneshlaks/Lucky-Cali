import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../ui/button";
import api from '@/components/shared/api';
import { Toaster, toast } from 'sonner';
import { useAuth } from '@/components/shared/auth/AuthProvider';

export default function WorkoutLog() {
  const currentDate = new Date().toLocaleDateString();
  const { token } = useAuth();

  const [formValues, setFormValues] = useState({
    title: `${currentDate} Workout Log`,
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchExistingLog = async () => {
      try {
        if (token) {
          const response = await api.get(`/train/logs/today`);
          if (response.data.log) {
            setFormValues({
              title: response.data.log.title || `${currentDate} Workout Log`,
              description: response.data.log.description || '',
            });
          }
        }
      } catch (error) {
        console.error("Error fetching existing log:", error.response?.data || error.message);
      }
    };

    fetchExistingLog();
  }, [currentDate]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const today = new Date().toISOString().split('T')[0];

    try {
      if (token) {
        const checkResponse = await api.get('train/logs/today');
        if (checkResponse.data && checkResponse.data.log) {
          const response = await api.put('train/logs', {
            title: formValues.title,
            description: formValues.description,
          });
          toast.success('Log Updated!');
          console.log('Workout log updated:', response.data);
        } else {
          const response = await api.post('train/logs', {
            title: formValues.title,
            description: formValues.description,
            date: today,
          });
          toast.success('Log Submitted!');
          console.log('Workout log created:', response.data);
        }
      } else {
        toast('Sign in to Submit Logs');
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting workout log:", error.response?.data || error.message);
    }
  };

  const handleInsight = async () => {
    toast('Feature Temporarily Down');
  };

  return (
    <Card className="bg-black text-white border shadow-lg rounded-lg flex flex-col h-full">
      <Toaster />
      <div className="px-6 py-5 flex justify-between items-center border-b border-gray-800">
        <CardTitle>Workout Log</CardTitle>
        <CardDescription>State how today's workout went</CardDescription>
      </div>
      <CardContent className="flex flex-col flex-grow space-y-4 p-6 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="title" className="text-lg font-medium">Title</Label>
          <Input
            id="title"
            type="text"
            className="w-full bg-black text-white rounded-md p-2 border border-gray-800 focus:border-white transition-colors"
            value={formValues.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col flex-grow">
          <Label htmlFor="description" className="text-lg font-medium">Description</Label>
          <Textarea
            id="description"
            className="flex-grow bg-black text-white rounded-md p-2 border border-gray-800 focus:border-white transition-colors resize-none h-full"
            value={formValues.description}
            onChange={handleChange}
          />
        </div>
      </CardContent>
      <CardFooter className="justify-center py-4">
        <div className="space-x-3">
          <Button
            variant="outline"
            className="border-white hover:bg-white hover:text-black transition-colors duration-200"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="default"
            className="bg-white text-black hover:bg-gray-200 transition-colors duration-200"
            onClick={handleInsight}
          >
            Insight
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
