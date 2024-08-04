const createNode = (id, label, x, y, level) => ({
    id,
    position: { x, y },
    data: { label },
    level,
    style: { background: '#000', color: '#fff', border: '1px solid #fff', padding: 10, borderRadius: 5 }
  });
  
  const createAnimatedEdge = (source, target) => ({
    id: `e${source}-${target}`,
    source,
    target,
    animated: true,
    style: { stroke: '#fff' }
  });
  
  const createStaticEdge = (source, target) => ({
    id: `e${source}-${target}`,
    source,
    target,
    animated: false,
    style: { stroke: '#fff' }
  });


export {createNode, createAnimatedEdge, createStaticEdge};