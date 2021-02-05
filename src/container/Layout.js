import dagre from 'dagre';
import  { isNode} from 'react-flow-renderer';


const Layout = (elements) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    
    dagreGraph.setGraph({ rankdir: 'TB' });
    dagreGraph.setGraph({ align: 'UL' });
    elements.forEach((el) => {
        if (isNode(el)) {
            dagreGraph.setNode(el.id, { width: 150, height: 50 });
        } else {
            dagreGraph.setEdge(el.source, el.target);
        }
    });
    dagre.layout(dagreGraph);
    return elements.map((el) => {
        if (isNode(el)) {
            const nodeWithPosition = dagreGraph.node(el.id);
            el.targetPosition = 'top';
            el.sourcePosition = 'bottom';

            el.position = { 
                x: nodeWithPosition.x - (nodeWithPosition.width / 2),
                y: nodeWithPosition.y - (nodeWithPosition.height / 2),
              };        
        }
        return el;
    });
};

export default Layout