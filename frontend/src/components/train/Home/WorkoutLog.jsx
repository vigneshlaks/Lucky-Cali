import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../ui/button";
import { z } from "zod";
import api from '@/components/shared/api'; // Assuming your API configuration is here
import { Toaster, toast } from 'sonner';

const workoutLogSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title can't exceed 100 characters"),
  description: z.string().min(1, "Description is required").max(1000, "Description can't exceed 1000 characters"),
});

export default function WorkoutLog() {
  const currentDate = new Date().toLocaleDateString();

  const [formValues, setFormValues] = useState({
    title: `${currentDate} Workout Log`,
    description: ''
  });
  const [errors, setErrors] = useState({ title: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchExistingLog = async () => {
      try {
        const response = await api.get(`/train/logs/today`);
        if (response.data) {
          setFormValues({
            title: response.data.title || `${currentDate} Workout Log`,
            description: response.data.description || '',
          });
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
    const result = workoutLogSchema.safeParse(formValues);

    if (!result.success) {
      const validationErrors = result.error.format();
      setErrors({
        title: validationErrors.title?._errors[0] || '',
        description: validationErrors.description?._errors[0] || '',
      });
    } else {
      setErrors({ title: '', description: '' });
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

      try {
        const checkResponse = await api.get(`train/logs/today`);

        if (checkResponse.data) {
          // Update existing log
          const response = await api.put(`train/logs`, {
            title: formValues.title,
            description: formValues.description,
          });
          toast.success('Log Updated!');
          console.log('Workout log updated:', response.data);
        } else {
          // Create new log
          const response = await api.post('train/logs', {
            title: formValues.title,
            description: formValues.description,
            date: today,
          });
          toast.success('Log Submitted!');
          console.log('Workout log created:', response.data);
        }

        setSubmitted(true);
      } catch (error) {
        console.error("Error submitting workout log:", error.response?.data || error.message);
      }
    }
  };

  return (
    <Card className="bg-black text-white border shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
      <Toaster />
      <div className="px-6 py-5 flex justify-between items-center border-b border-gray-800">
        <CardTitle>Workout Log</CardTitle>
        <CardDescription>State how today's workout went</CardDescription>
      </div>
      <CardContent className="flex-grow flex flex-col space-y-4 p-6">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="title" className="text-lg font-medium">Title</Label>
          <Input
            id="title"
            type="text"
            className="w-full bg-black text-white rounded-md p-2 border border-gray-800 focus:border-white transition-colors"
            value={formValues.title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="flex flex-col flex-grow space-y-2">
          <Label htmlFor="description" className="text-lg font-medium">Description</Label>
          <Textarea
            id="description"
            className="flex-grow bg-black text-white rounded-md p-2 border border-gray-800 focus:border-white transition-colors resize-none"
            value={formValues.description}
            onChange={handleChange}
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
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
          >
            Insight
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
