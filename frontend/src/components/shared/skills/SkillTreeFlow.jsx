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

// Helper function to create an animated edge
const createAnimatedEdge = (source, target) => ({
  id: `${source}-${target}`,
  source,
  target,
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed },
});

// Helper function to create a node
const createNode = (id, label, x, y, level, type = 'custom') => ({
  id,
  type, // Node type, default to 'custom' unless specified
  position: { x, y },
  data: {
    category: label,
    skills: [],
  },
});

// Function to generate nodes and edges based on skill data
const generateNodesAndEdges = (data, skills, onStatusChange) => {
  // Create initial nodes
  let nodes = [
    createNode('player-profile', 'Player Profile', 1000, 50, 0, 'playerProfile'),

    createNode('foundations', 'Foundations', 1000, 500, 0),
    createNode('push', 'Push', 500, 650, 1),
    createNode('pull', 'Pull', 1000, 650, 1),
    createNode('legs', 'Legs', 1500, 650, 1),

    // Upper Body Push
    createNode('pushups', 'Pushups', 300, 800, 2),
    createNode('dips', 'Dips', 500, 800, 2),
    createNode('handstands', 'Handstands', 700, 800, 2),

    // Upper Body Pull
    createNode('pullups', 'Pullups', 900, 800, 2),
    createNode('rows', 'Rows', 1100, 800, 2),

    // Lower Body
    createNode('squats', 'Squats', 1400, 800, 2),
    createNode('lunges', 'Lunges', 1600, 800, 2),

    // Advanced Movements
    createNode('planche', 'Planche', 300, 950, 3),
    createNode('handstand-pushups', 'Handstand Pushups', 700, 950, 3),
    createNode('muscle-up', 'Muscle Up', 900, 950, 3),
    createNode('front-lever', 'Front Lever', 1100, 950, 3),
  ];


  console.log(skills);
  // Merge skills from flowDiagramData into nodes
  nodes = nodes.map(node => {
    if (node.type === 'playerProfile') {
      return {
        ...node,
        data: {
          ...node.data,
          skills, // Pass the full skills array to the PlayerProfileNode
          onStatusChange, // Pass the status change handler
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
          onStatusChange
        },
      };
    }
    return node;
  });

  // Add skill status to nodes, skipping the 'playerProfile' type
  nodes = nodes.map(node => {
    // Skip updating skills for the playerProfile node
    if (node.type === 'playerProfile') {
      return node;
    }

    // Iterate through the skills inside each node's data
    const updatedSkills = node.data.skills.map(skill => {
      // Find the corresponding skill status from the skills array passed as a prop
      const skillStatus = skills.find(s => s.skill_id === skill.id) || { status: 3 };

      // Return the skill with the updated status
      return {
        ...skill,
        status: skillStatus.status,
      };
    });

    // Return the node with updated skills
    return {
      ...node,
      data: {
        ...node.data,
        skills: updatedSkills,
        onStatusChange,
      },
    };
  });


  // Create edges
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
    createAnimatedEdge('handstands', 'handstand-pushups'),
    createAnimatedEdge('pullups', 'muscle-up'),
    createAnimatedEdge('rows', 'front-lever'),
  ];

  return { nodes, edges };
};

// Main SkillTreeFlow component
const SkillTreeFlow = ({ skills, onStatusChange }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);


  // Update nodes and edges when skills change
  useEffect(() => {
    const { nodes: updatedNodes, edges: updatedEdges } = generateNodesAndEdges(skillsData, skills, onStatusChange);
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  }, [skills]);


  // Memoize node types
  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
      playerProfile: PlayerProfileNode,
    }),
    []
  );

  // Callbacks for node and edge changes
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
