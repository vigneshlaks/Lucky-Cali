import React, { Suspense, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { skillsData } from '../../../shared/skillsData';
import { textDiagramData } from './innerTextData';
import { createNode, createAnimatedEdge } from '../skillTreeUtils';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';

const InnerPage = () => {
  const { nodeid } = useParams();
  const navigate = useNavigate();
  const diagramData = skillsData[nodeid];
  const textData = textDiagramData[nodeid];
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  if (!diagramData && !textData) {
    return <p>Invalid node ID: {nodeid}</p>;
  }

  // If a node is selected, render its textData
  if (selectedNodeId) {
    const selectedTextData = textDiagramData[selectedNodeId];

    if (selectedTextData) {
      return (
        <div className="bg-black text-white p-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{selectedTextData.title}</h1>
          <div className="border-t border-white mt-2"></div>
          <p className="text-gray-300 leading-relaxed">{selectedTextData.body}</p>
          <button
            onClick={() => setSelectedNodeId(null)}
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            Back to Diagram
          </button>
        </div>
      );
    } else {
      return (
        <div className="bg-black text-white min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-black rounded-lg p-6">
              <p className="text-white leading-relaxed text-center">
                Detailed information for this skill is currently being developed. 
                Please check back later for updates on this skill node.
              </p>
            </div>
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setSelectedNodeId(null)}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              >
                Back to Diagram
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  if (diagramData) {
    const verticalSpacing = 150; // Constant vertical spacing between nodes
    const startX = 0; // Fixed X position for all nodes
    const startY = 0; // Starting Y position for the first node

    // Adjust nodes so they are positioned vertically with constant spacing
    const nodes = diagramData.nodes.map((node, index) =>
      createNode(node.id, node.label, startX, startY + index * verticalSpacing)
    );

    const edges = diagramData.edges.map((edge) =>
      createAnimatedEdge(edge.source, edge.target)
    );

    const fitViewOptions = {
      padding: 1,
      minZoom: 0.5,
      maxZoom: 1.5,
    };

    const onNodeClick = (event, node) => {
      setSelectedNodeId(node.id);
    };

    return (
      <div
        className="inner-flow-diagram"
        style={{ width: '100%', height: '100vh' }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={onNodeClick}
            fitView={fitViewOptions}
          >
            <Background />
          </ReactFlow>
        </Suspense>
      </div>
    );
  }

  if (textData) {
    return (
      <div className="bg-black text-white p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{textData.title}</h1>
        <div className="border-t border-white mt-2"></div>
        <p className="text-gray-300 leading-relaxed">{textData.body}</p>
      </div>
    );
  }
  return null;
};

export default InnerPage;
