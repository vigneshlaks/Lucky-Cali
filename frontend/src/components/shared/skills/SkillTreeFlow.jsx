/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  applyEdgeChanges, 
  applyNodeChanges,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import { skillsData } from '../skillsData';
import PlayerProfileNode from './PlayerProfileNode';
import { createStaticEdge } from '@/components/train/skillTree/skillTreeUtils';

const createAnimatedEdge = (source, target) => ({
  id: `${source}-${target}`,
source,
  target,
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed },
});

const createNode = (id, label, x, y, level, type = 'custom') => ({
  id,
  type, 
  position: { x, y },
  data: {
    category: label,
    skills: [],
  },
});

const generateNodesAndEdges = (data, skills, onStatusChange) => {
  let nodes = [
    createNode('player-profile', 'Player Profile', 50, 50, 0, 'playerProfile'),
  
    createNode('foundations', 'Foundations', 1115, 200, 0),
  
    createNode('push', 'Push', 375, 500, 1),
    createNode('pull', 'Pull', 1150, 500, 1),
    createNode('legs', 'Legs', 1700, 500, 1),
  
    createNode('pushups', 'Pushups', 0, 800, 2),
    createNode('dips', 'Dips', 300, 800, 2),
    createNode('handstands', 'Handstands', 600, 800, 2),
  
    createNode('pullups', 'Pullups', 900, 800, 2),
    createNode('rows', 'Rows', 1200, 800, 2),
  
    createNode('squats', 'Squats', 1500, 800, 2),
    createNode('lunges', 'Lunges', 1800, 800, 2),
  
    createNode('planche', 'Planche', -20, 1100, 3),             
    createNode('handstandPushups', 'Handstand Pushups', 590, 1100, 3), 
    createNode('muscleUps', 'Muscle Up', 888, 1100, 3),           
    createNode('frontLever', 'Front Lever', 1187, 1100, 3),      
  ];



  nodes = nodes.map(node => {
    if (node.type === 'playerProfile') {
      return {
        ...node,
        data: {
          ...node.data,
          skills,
        }
      };
    }

    const categoryData = data[node.id];
    if (categoryData) {
      return {
        ...node,
        data: {
          ...node.data,
          skills: categoryData.nodes,
        },
      };
    }
    return node;
  });

  nodes = nodes.map(node => {
    if (node.type === 'playerProfile') {
      return node;
    }

    const updatedSkills = node.data.skills.map(skill => {
      const skillStatus = skills.find(s => s.skill_id === skill.id) || { status: 3 };

      return {
        ...skill,
        status: skillStatus.status,
      };
    });

    return {
      ...node,
      data: {
        ...node.data,
        skills: updatedSkills,
      },
    };
  });


  const edges = [
    createAnimatedEdge('foundations', 'push'),
    createAnimatedEdge('foundations', 'pull'),
    createAnimatedEdge('foundations', 'legs'),
    createAnimatedEdge('push', 'pushups'),
    createAnimatedEdge('push', 'dips'),
    createAnimatedEdge('push', 'handstands'),
    createAnimatedEdge('pull', 'pullups'),
    createAnimatedEdge('pull', 'rows'),
    createAnimatedEdge('legs', 'squats'),
    createAnimatedEdge('legs', 'lunges'),
    createAnimatedEdge('pushups', 'planche'),
    createAnimatedEdge('handstands', 'handstandPushups'),
    createAnimatedEdge('pullups', 'muscleUps'),
    createAnimatedEdge('rows', 'frontLever'),
  ];

  return { nodes, edges };
};

const SkillTreeFlow = ({ skills }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);


  useEffect(() => {
    const { nodes: updatedNodes, edges: updatedEdges } = generateNodesAndEdges(skillsData, skills);
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  }, [skills]);


  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
      playerProfile: PlayerProfileNode,
    }),
    []
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default SkillTreeFlow;
