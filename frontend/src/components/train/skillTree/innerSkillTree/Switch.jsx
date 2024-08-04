import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { skillsData } from '../../../shared/skillsData';
import { textDiagramData } from './innerTextData';
import { createNode, createAnimatedEdge } from '../skillTreeUtils';
import ReactFlow, { Background } from 'reactflow';
import { Separator } from '@radix-ui/react-select';
import 'reactflow/dist/style.css';

const InnerPage = () => {
  const { nodeid } = useParams();
  const diagramData = skillsData[nodeid];
  const textData = textDiagramData[nodeid];

  if (!diagramData && !textData) {
    return <p>Invalid node ID: {nodeid}</p>;
  }

  if (diagramData) {
    const nodes = diagramData.nodes.map(node => createNode(node.id, node.label, node.x, node.y, node.level));
    const edges = diagramData.edges.map(edge => createAnimatedEdge(edge.source, edge.target));
    const fitViewOptions = {
      padding: 1,
      minZoom: 0.5,
      maxZoom: 1.5,
    };

    return (
      <div className="inner-flow-diagram" style={{ width: '100%', height: '100vh' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <ReactFlow nodes={nodes} edges={edges} fitView={fitViewOptions}>
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
