import React, { useMemo, useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  applyEdgeChanges, 
  applyNodeChanges,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import { skillsData } from '../skillsData';

const createAnimatedEdge = (source, target) => ({
  id: `${source}-${target}`,
  source,
  target,

  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed },
});

const createStaticEdge = (source, target) => ({
  id: `${source}-${target}`,
  source,
  target,

  markerEnd: { type: MarkerType.ArrowClosed },
});

const createNode = (id, label, x, y, level) => ({
  id,
  type: 'custom',
  position: { x, y },
  data: {
    category: label,
    skills: []
  }
});

const generateNodesAndEdges = (data) => {
  let nodes = [
    createNode('foundations', 'Foundations', 1000, 0, 0),
  
    createNode('push', 'Push', 500, 150, 1),
    createNode('pull', 'Pull', 1000, 150, 1),
    createNode('legs', 'Legs', 1500, 150, 1),
  
    // Upper Body Push
    createNode('pushups', 'Pushups', 300, 300, 2),
    createNode('dips', 'Dips', 500, 300, 2),
    createNode('handstands', 'Handstands', 700, 300, 2),
  
    // Upper Body Pull
    createNode('pullups', 'Pullups', 900, 300, 2),
    createNode('rows', 'Rows', 1100, 300, 2),
  
    // Lower Body
    createNode('squats', 'Squats', 1400, 300, 2),
    createNode('lunges', 'Lunges', 1600, 300, 2),
  
    // Advanced Movements
    createNode('planche', 'Planche', 300, 450, 3),
    createNode('handstand-pushups', 'Handstand Pushups', 700, 450, 3),
    createNode('muscle-up', 'Muscle Up', 900, 450, 3),
    createNode('front-lever', 'Front Lever', 1100, 450, 3),
  ];
  

  // Merge skills from flowDiagramData into our nodes
  nodes = nodes.map(node => {
    const categoryData = data[node.id];
    if (categoryData) {
      return {
        ...node,
        data: {
          ...node.data,
          skills: categoryData.nodes
        }
      };
    }
    return node;
  });

  const edges = [
    createAnimatedEdge('foundations', 'push'),
    createAnimatedEdge('foundations', 'pull'),
    createAnimatedEdge('foundations', 'legs'),
    createAnimatedEdge('push', 'pushups'),
    createStaticEdge('push', 'dips'),
    createAnimatedEdge('push', 'handstands'),
    createStaticEdge('pull', 'pullups'),
    createAnimatedEdge('pull', 'rows'),
    createAnimatedEdge('legs', 'squats'),
    createStaticEdge('legs', 'lunges'),
    createAnimatedEdge('pushups', 'planche'),
    createStaticEdge('handstands', 'handstand-pushups'),
    createAnimatedEdge('pullups', 'muscle-up'),
    createStaticEdge('rows', 'front-lever'),
  ];

  return { nodes, edges };
};

const { nodes: initialNodes, edges: initialEdges } = generateNodesAndEdges(skillsData);



const SkillTreeFlow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
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
        fitViewOptions={{ padding: 0.1 }} 
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default SkillTreeFlow;