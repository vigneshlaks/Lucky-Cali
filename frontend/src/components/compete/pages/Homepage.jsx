import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { toast } from "@/components/ui/use-toast";
import { skillsData } from '@/components/shared/skillsData';


const findSkillById = (skillsData, skillId) => {
  // Loop through each category of skills
  for (const categoryKey in skillsData) {
    const category = skillsData[categoryKey];
    // Attempt to find the skill in the 'nodes' array of the current category
    const skill = category.nodes.find(skill => skill.id === skillId);
    if (skill) {
      return skill; // Return the found skill if it exists
    }
  }
  return null; // Return null if no skill is found with the given ID
};

// Dynamically create the FormSchema based on completed skills
const createFormSchema = (completedSkills, skillsData) => {
  const skillsSchema = {};
  const goalsSchema = {};

  completedSkills.forEach(skillId => {
    const skill = findSkillById(skillsData, skillId);
    if (!skill) {
      console.error(`Skill not found: ${skillId}`); // Or handle this case appropriately
      return;
    }
    
    skillsSchema[skillId] = z.object({
      selected: z.boolean().default(false),
      label: z.string().default(skill.label),
      type: z.string().default(skill.type)
    });
  
    goalsSchema[skillId] = skill.type === 'dynamic'
      ? z.number().min(1).optional()
      : z.number().min(1).optional();
  });

  return z.object({
    duration: z.enum(['2 Week', '4 Week']),
    skills: z.object(skillsSchema),
    goals: z.object(goalsSchema) // Top-level dynamic goals schema based on skill types
  });
};

function NewContest() {
  const { completedSkills, loading, error } = useCompletedSkills();

  const FormSchema = createFormSchema(completedSkills, skillsData);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      duration: '2 Week',
      skills: completedSkills.reduce((acc, skillId) => {
        const skill = findSkillById(skillsData, skillId);
        // Initialize each skill with default settings
        if (skill) {
          acc[skillId] = {
            selected: false,
            label: skill.label,
            type: skill.type
          };
        }
        return acc;
      }, {}),
      goals: completedSkills.reduce((acc, skillId) => {
        const skill = findSkillById(skillsData, skillId);
        // Initialize goals based on the type of the skill
        if (skill) {
          acc[skillId] = skill.type === 'dynamic'
            ? { reps: 0 }  // Default for dynamic skills if using reps
            : { duration: 0 };  // Default for static skills if using duration
        }
        return acc;
      }, {}),
    },
  });

  const onSubmit = (data) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <Card className="bg-black text-white border border-white">
          <CardHeader>
            <CardTitle className="text-white">Enter Contest</CardTitle>
            <p className="text-gray-400">Climb the leaderboard while receiving feedback</p>
          </CardHeader>
          <CardContent>
          <FormField
            className="flex flex-row"
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <FormLabel className="text-base text-white">Duration</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row justify-center items-center space-x-4"
                  >
                    {['2 Week', '4 Week'].map((option) => (
                      <FormItem key={option} className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value={option} className="text-white border-white" />
                        </FormControl>
                        <FormLabel className="font-normal text-white">{option}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base text-white">Skills</FormLabel>
                    <FormDescription className="text-xs text-gray-400">
                      Choose up to 3 skills
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {completedSkills.map((skillId) => (
                      <FormField
                        key={skillId}
                        control={form.control}
                        name="skills"
                        render={({ field }) => {
                          const skill = findSkillById(skillsData, skillId);
                          return (
                            <FormItem
                              key={skillId}
                              className="flex flex-row items-start space-x-3 space-y-0 mb-5"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value[skillId]?.selected}
                                  onCheckedChange={(checked) => {
                                    const selectedCount = Object.values(field.value).filter(v => v.selected).length;
                                    if (selectedCount < 3 || !checked) {
                                      field.onChange({
                                        ...field.value,
                                        [skillId]: { ...field.value[skillId], selected: checked }
                                      });
                                    }
                                  }}
                                  className="text-white border-white"
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-white capitalize">
                                {skill?.label || skillId}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="goals"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base text-white">Goals</FormLabel>
                  </div>
                  <div className="grid gap-2">
                    {Object.entries(form.watch('skills')).map(
                      ([skillId, skillData]) => {
                        if (!skillData.selected) return null;
                        const skill = findSkillById(skillsData, skillId);
                        return (
                          <FormField
                            key={skillId}
                            control={form.control}
                            name={`goals.${skillId}`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white capitalize">
                                  {skill?.label || skillId} Goal ({skill?.type === 'dynamic' ? 'Reps' : 'Seconds'})
                                </FormLabel>
                                <FormControl>
                                  <input
                                    type="number"
                                    {...field}
                                    min="0"
                                    onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                                    placeholder={`Set your goal for ${skill?.label || skillId}...`}
                                    className="w-full bg-black text-white border border-white p-2 rounded"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        );
                      }
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-center">
            <Button type="submit" variant="ringHover">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

function InContest({ week, feedbackEntries }) {
  return (
    <Card className="bg-black text-white border border-white w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-white">Week {week}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Previous Feedback</h3>
          <div className="space-y-4">
            {feedbackEntries.map((feedback, index) => (
              <div key={index} className="w-full">
                <h4 className="text-md font-medium text-white">Week {index + 1}</h4>
                <div className="bg-black border border-white p-3 rounded-md">
                  <p className="text-sm text-white">{feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Video Submission</h3>
          <div className="space-y-2">
            <input
              type="file"
              accept="video/*"
              className="w-full text-sm text-white
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-white
              file:text-sm file:font-semibold
              file:bg-black file:text-white"
            />
            <Textarea
              placeholder="Add a description or notes about your video..."
              className="w-full h-24 bg-black text-white border-white"
            />
            <div className="flex justify-center">
              <Button variant="ringHover" size="sm">Submit Video</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function WorkoutPlanForm() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-8 bg-black p-4">
      <NewContest />
      <InContest
        week={3}
        feedbackEntries={[
          "Great work! Keep improving your form. Focus on maintaining proper posture throughout the exercises.",
          "Nice job on increasing the weight. Remember to focus on your breathing technique during lifts.",
          "Your flexibility has improved. Keep up with your stretching routine for continued progress.",
          "Excellent progress on your cardio endurance! Try incorporating interval training for further improvement."
        ]}
      />
    </div>
  );
}