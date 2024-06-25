import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Define nodes with level information
const initialNodes = [
  { id: '1', type: 'input', position: { x: 300, y: 50 }, data: { label: 'Foundations' }, level: 0 },
  { id: '2', position: { x: 150, y: 150 }, data: { label: 'Push' }, level: 1 },
  { id: '3', position: { x: 450, y: 150 }, data: { label: 'Pull' }, level: 1 },
  { id: '4', position: { x: 300, y: 150 }, data: { label: 'Legs' }, level: 1 },
  { id: '5', position: { x: 75, y: 250 }, data: { label: 'Handstand' }, level: 2 },
  { id: '6', position: { x: 225, y: 250 }, data: { label: 'Push up' }, level: 2 },
  { id: '7', position: { x: 375, y: 250 }, data: { label: 'Pull up' }, level: 2 },
  { id: '8', position: { x: 525, y: 250 }, data: { label: 'Front Lever' }, level: 2 }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e1-4', source: '1', target: '4', animated: true },
  { id: 'e2-5', source: '2', target: '5', animated: true },
  { id: 'e2-6', source: '2', target: '6', animated: true },
  { id: 'e3-7', source: '3', target: '7', animated: true },
  { id: 'e3-8', source: '3', target: '8', animated: true }
];

const FlowDiagram = () => {
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // eslint-disable-next-line no-unused-vars
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const navigate = useNavigate();

  const onNodeClick = (event, node) => {
    navigate(`/flowdiagram/${node.id}`);
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
    <div className="w-full h-full" style={{ height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background variant="dots" gap={24} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
