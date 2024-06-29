import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Textarea } from "@/components/ui/textarea"
  
  export default function DiaryEntry() {
    const date = new Date();
  
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
  
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
  
    return (
      <Card>
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
                className="w-full"
                defaultValue={`${currentDate} Workout Log`}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                defaultValue={`Log Entry for ${currentDate}`}
                className="min-h-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }