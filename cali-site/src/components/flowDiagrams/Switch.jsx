import { useParams } from 'react-router-dom';
import FlowDiagramHandstand from './Handstand';
import FlowDiagramPushUp from './Pushup';
import FlowDiagramPullUp from './Pullup';
import FlowDiagramFrontLever from './FrontLever';

const InnerFlowDiagram = () => {
  const { nodeid } = useParams();

  const renderFlowDiagram = () => {
    switch (nodeid) {
      case '5':
        return <FlowDiagramHandstand />;
      case '6':
        return <FlowDiagramPushUp />;
      case '7':
        return <FlowDiagramPullUp />;
      case '8':
        return <FlowDiagramFrontLever />;
      default:
        return <p>Invalid node ID</p>;
    }
  };

  return (
    <div className="inner-flow-diagram" style={{ width: '100%', height: '100vh' }}>
      {renderFlowDiagram()}
    </div>
  );
};

export default InnerFlowDiagram;
