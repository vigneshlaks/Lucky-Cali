// PlayerProfileNode.js
import React from 'react';
import PlayerProfile from './PlayerProfile'; // Adjust the path as needed

const PlayerProfileNode = ({ data }) => {
    console.log(data);
    return (
    <div style={{ width: '300px', height: 'auto' }}>
        <PlayerProfile skills={data.skills} />
    </div>
    );
};

export default PlayerProfileNode;
