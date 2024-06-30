import React from 'react';
import RadarChart from './RadarChart';
import PlayerSprite from './PlayerSprite';

const PlayerProfile = () => {
  return (
    <div className='flex flex-col w-full border-2 rounded-lg border-white'>
      <div className='flex w-full'>
        <div className='flex-1 rounded-lg flex items-center justify-center'>
          <div className='text-white'><PlayerSprite /></div>
        </div>
        <div className='border-l-2 border-white'></div>
        <div className='flex-1 p-4'>
          <RadarChart />
        </div>
      </div>
      <div className='border-t-2 border-white'></div>
      <div className='flex flex-col p-4 rounded-lg items-center justify-center'>
        <div className='text-white'>Comp Rank: </div>
        <div className='text-white'>Spectator Rank: </div>
      </div>
    </div>
  );
}

export default PlayerProfile;
