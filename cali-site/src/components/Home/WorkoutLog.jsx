import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Textarea } from "@/components/ui/textarea"
  import { Button } from "../ui/button"
  
  export default function DiaryEntry() {
    const date = new Date();
  
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
  
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
  
    return (
      <Card className='bg-black text-white'>
        <CardHeader>
          <CardTitle>Workout Log</CardTitle>
          <CardDescription>
            State how today's workout went
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Title</Label>
              <Input
                id="name"
                type="text"
                className="w-full bg-black text-white"
                defaultValue={`${currentDate} Workout Log`}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="min-h-32 bg-black text-white"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="ringHover" className="mr-2">Submit</Button>
          <Button variant="ringHover">Insight</Button>
        </CardFooter>
        
      </Card>
    )
  }