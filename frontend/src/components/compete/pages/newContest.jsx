import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
  } from '@/components/ui/card';
  import { Label } from '@/components/ui/label';
  import { Button } from '@/components/ui/button';
  import { Checkbox } from '@/components/ui/checkbox';
  import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
const newContest = () => {
  return (
    <div>
        <Card className="bg-black text-white w-full max-w-md">
        <CardHeader className="text-center">
            <CardTitle className="text-xl">Enter Contest</CardTitle>
            <CardDescription className="text-center">
            Climb the leaderboard while receiving feedback
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form className="grid gap-4">
            <div>
                <Label className="mb-6 block text-center">Duration</Label>
                <div className="flex gap-2 justify-center">
                <RadioGroup defaultValue="medium" className="flex justify-center space-x-4">
                <div key={"4 Week"} className="flex items-center space-x-2">
                    <RadioGroupItem value={"2 Week"} id={"twoweek"} className="text-white border-white" />
                    <Label htmlFor={"twoweek"}>{"2 Week"}</Label>
                    </div>
                    <div key={"4 Week"} className="flex items-center space-x-2">
                    <RadioGroupItem value={"4 Week"} id={"fourweek"} className="text-white border-white" />
                    <Label htmlFor={"fourweek"}>{"4 Week"}</Label>
                    </div>
                </RadioGroup>
                </div>
            </div>
            <div>
                <Label className="mb-6 block text-center">Skills</Label>
                <div className="grid grid-cols-2 gap-3 justify-items-center">
                {['Strength', 'Cardio', 'Flexibility', 'Balance'].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                    <Checkbox className='text-white border-white' id={skill.toLowerCase()} />
                    <Label htmlFor={skill.toLowerCase()}>{skill}</Label>
                    </div>
                ))}
                </div>
            </div>
            <div className="flex flex-col items-center">
                <Label className="mb-6 block text-center">Intensity</Label>
                <RadioGroup defaultValue="medium" className="flex justify-center space-x-4">
                {['Low', 'Medium', 'High'].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                    <RadioGroupItem value={level.toLowerCase()} id={level.toLowerCase()} className="text-white border-white" />
                    <Label htmlFor={level.toLowerCase()}>{level}</Label>
                    </div>
                ))}
                </RadioGroup>
            </div>
            </form>
        </CardContent>
        <CardFooter className="justify-center">
            <Button variant="ringHover" size="sm">
            Submit
            </Button>
        </CardFooter>
    </Card>
    </div>
  )
}

export default newContest;
