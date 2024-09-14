/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { createNode, createAnimatedEdge, createStaticEdge } from './skillTreeUtils';



const initialNodes = [
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

const initialEdges = [
  createAnimatedEdge('foundations', 'push'), createAnimatedEdge('foundations', 'pull'), createAnimatedEdge('foundations', 'legs'),
  createAnimatedEdge('push', 'pushups'), createAnimatedEdge('push', 'dips'), createAnimatedEdge('push', 'handstands'),
  createAnimatedEdge('pull', 'pullups'), createAnimatedEdge('pull', 'rows'),
  createAnimatedEdge('legs', 'squats'), createAnimatedEdge('legs', 'lunges'),
  createAnimatedEdge('pushups', 'planche'),
  createAnimatedEdge('handstands', 'handstand-pushups'),
  createAnimatedEdge('pullups', 'muscle-up'),
  createAnimatedEdge('rows', 'front-lever'),
];

const FlowDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const navigate = useNavigate();

  const onNodeClick = (event, node) => {
    navigate(`${node.id}`);
  };

  const handleNodesChange = (changes) => {
    changes.forEach(change => {
      if (change.type === 'position' && (!change.position || change.position.x === undefined || change.position.y === undefined)) {
        console.error(`Node with id ${change.id} has an invalid position:`, change.position);
      }
    });
    onNodesChange(changes);
  };

  return (
    <div className="w-full h-full" style={{ height: '100vh', backgroundColor: '#000' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background variant="dots" gap={24} size={1} color="#fff" />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
