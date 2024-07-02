import React from 'react';
import { CardHeader, Card, CardContent } from '../ui/card';
import { Separator } from "@/components/ui/separator";
import CheckBoxes from './CheckBoxes';
import { Button } from '../ui/button';

const Challenges = () => {
  const challenges = [
    { id: 1, title: 'Complete 100 Push-Ups' },
    { id: 2, title: 'Run 5 Miles' },
    { id: 3, title: 'Meditate for 10 Minutes' },
  ];

  return (
    <Card className="bg-black text-white">

      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Weekly Challenges</h2>
        <Button variant="ringHover">Reroll</Button>
      </div>
      <CardContent>
        <div className='flex flex-col items-center'>
          <Separator />
          <CheckBoxes challenges={challenges} />
        </div>
      </CardContent>
    </Card>
  );
}

export default Challenges;
