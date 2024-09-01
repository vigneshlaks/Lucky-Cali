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
  // Create initial nodes with adjusted positions for aesthetic appeal
  let nodes = [
    // Player Profile in the top left corner
    createNode('player-profile', 'Player Profile', 50, 50, 0, 'playerProfile'),
  
    // Main Categories spaced with more vertical and horizontal room
    createNode('foundations', 'Foundations', 1000, 200, 0),
  
    // Main Categories (Push, Pull, Legs) positioned below Foundations with increased spacing
    createNode('push', 'Push', 375, 500, 1),
    createNode('pull', 'Pull', 1050, 500, 1),
    createNode('legs', 'Legs', 1500, 500, 1),
  
    // Upper Body Push nodes directly below Push with increased vertical spacing
    createNode('pushups', 'Pushups', 0, 800, 2),
    createNode('dips', 'Dips', 300, 800, 2),
    createNode('handstands', 'Handstands', 600, 800, 2),
  
    // Upper Body Pull nodes directly below Pull with increased vertical spacing
    createNode('pullups', 'Pullups', 900, 800, 2),
    createNode('rows', 'Rows', 1200, 800, 2),
  
    // Lower Body nodes directly below Legs with increased vertical spacing
    createNode('squats', 'Squats', 1400, 800, 2),
    createNode('lunges', 'Lunges', 1600, 800, 2),
  
    // Advanced Movements spaced further below respective categories with increased vertical spacing
    createNode('planche', 'Planche', 70, 1100, 3),             
    createNode('handstandPushups', 'Handstand Pushups', 630, 1100, 3), 
    createNode('muscleUp', 'Muscle Up', 971, 1100, 3),           
    createNode('frontLever', 'Front Lever', 1200, 1100, 3),      
  ];



  // Merge skills from flowDiagramData into nodes
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
const SkillTreeFlow = ({ skills }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);


  // Update nodes and edges when skills change
  useEffect(() => {
    const { nodes: updatedNodes, edges: updatedEdges } = generateNodesAndEdges(skillsData, skills);
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
