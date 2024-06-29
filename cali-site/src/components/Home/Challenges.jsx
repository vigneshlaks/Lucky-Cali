import React from 'react';
import { CardHeader, Card, CardContent } from '../ui/card';
import { Separator } from "@/components/ui/separator";
import CheckBoxes from './CheckBoxes';

const Challenges = () => {
  const challenges = [
    { id: 1, title: 'Complete 100 Push-Ups' },
    { id: 2, title: 'Run 5 Miles' },
    { id: 3, title: 'Meditate for 10 Minutes' },
  ];

  return (
    <Card className="bg-black text-white">
      <CardHeader>
        <h2 className="text-4xl">Weekly Challenges</h2>
      </CardHeader>
      <CardContent>
        <div>
          <Separator />
          <CheckBoxes challenges={challenges} />
        </div>
      </CardContent>
    </Card>
  );
}

export default Challenges;
