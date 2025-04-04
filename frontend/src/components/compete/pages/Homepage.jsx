/* eslint-disable react/prop-types */
import {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
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
import { Toaster, toast } from 'sonner';
import { skillsData } from '@/components/shared/skillsData';
import { useSkillContext } from '@/components/shared/SkillContext';
import api from '@/components/shared/api';
import { useAuth } from '@/components/shared/auth/AuthProvider';

const findSkillById = (skillsData, skillId) => {
  
  for (const categoryKey in skillsData) {
    const category = skillsData[categoryKey];
    
    const skill = category.nodes.find(skill => skill.id === skillId);
    if (skill) {
      return skill; 
    }
  }
  return null; 
};

function NewContest() {
  const { skills, loading, error } = useSkillContext();
  const { token } = useAuth();

  const determineColumns = (total) => {
    if (total <= 4) return 2; 
    if (total <= 9) return 3; 
    if (total <= 16) return 4;
    return 5;
  };

  
  const completedSkills = skills
    .filter(skill => skill.status === 2)
    .map(skill => skill.skill_id);
  
  const columns = determineColumns(completedSkills);

  const form = useForm({
    defaultValues: {
      duration: '2 Week',
      skills: completedSkills.reduce((acc, skillId) => {
        const skill = findSkillById(skillsData, skillId);
        
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
        
        if (skill) {
          acc[skillId] = skill.type === 'dynamic'
            ? { reps: 0 }  
            : { duration: 0 };  
        }
        return acc;
      }, {}),
    },
  });

  const onSubmit = async (data) => {
    try {
      if (token) {
        const response = await api.post('/compete/enter', data);
        toast.success('Entered Competition');
        console.log('Competition entry successful:', response.data);
      } else {
        toast('Sign in to Enter a Competition');
      }
      
    } catch (error) {
      console.error('Error entering competition:', error.response?.data || error.message);
      toast.error('Failed to enter competition');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <div
                    className="grid gap-3"
                    style={{
                      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    }}
                  >
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
                          );
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
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { token } = useAuth(); 

  
  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        if (token) {
          const response = await api.get('/user/status');
          setUserStatus(response.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user status:', err);
        setError('Failed to fetch user status');
        setLoading(false);
      }
    };

    fetchUserStatus();
  }, []);

  
  if (loading) return <div className="text-white">Loading...</div>;

  
  if (error) return <div className="text-red-500">{error}</div>;

  
  let feedbackEntries = [];
  if (userStatus && userStatus.in_competition && userStatus.feedback) {
    try {
      feedbackEntries = JSON.parse(userStatus.feedback);
    } catch (parseError) {
      console.error('Error parsing feedback JSON:', parseError);
      feedbackEntries = [];
    }
  }


  console.log(userStatus);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-8 bg-black p-4">
      {userStatus && userStatus.in_competition ? (
        <InContest
          week={3}
          feedbackEntries={
            feedbackEntries.length > 0
              ? feedbackEntries.map((entry) => entry.comment) 
              : []
          }
        />
      ) : (
        <NewContest />
      )}
    </div>
  );
}
