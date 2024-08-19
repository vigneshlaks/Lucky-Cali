import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../ui/button";
import { z } from "zod";
import api from '@/components/shared/api'; // Assuming your API configuration is here

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
        const response = await api.get(`/train/logs/today`)
        console.log(response);
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
        // First, check if a log for today already exists
        const checkResponse = await api.get(`train/logs/today`);
  
        if (checkResponse.data) {
          // If a log exists, make a PUT request to update it
          const response = await api.put(`train/logs`, { 
            title: formValues.title,
            description: formValues.description,
          });
          console.log('Workout log updated:', response.data);
        } else {
          // If no log exists, make a POST request to create a new one
          const response = await api.post('train/logs', {
            title: formValues.title,
            description: formValues.description,
            date: today,
          });
          console.log('Workout log created:', response.data);
        }
  
        setSubmitted(true);
        // Optionally reset the form or navigate the user
      } catch (error) {
        console.error("Error submitting workout log:", error.response?.data || error.message);
        // Optionally show an error message to the user
      }
    }
  };

  return (
    <Card className='bg-black text-white'>
      <CardHeader>
        <CardTitle>Workout Log</CardTitle>
        <CardDescription>State how today's workout went</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-7">
          <div className="grid gap-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              className="w-full bg-black text-white"
              value={formValues.title}
              onChange={handleChange}
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>
          <div className="grid gap-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="min-h-32 bg-black text-white"
              value={formValues.description}
              onChange={handleChange}
            />
            {errors.description && <p className="text-red-500">{errors.description}</p>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="ringHover" className="mr-2" onClick={handleSubmit}>Submit</Button>
        <Button variant="ringHover">Insight</Button>
      </CardFooter>
      {submitted && (
        <CardContent>
          <p className="text-green-500">Workout log submitted successfully!</p>
        </CardContent>
      )}
    </Card>
  );
}
