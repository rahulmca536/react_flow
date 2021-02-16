import Handle from './Handle';
import Node from './Node';
import routeElements from './route-elements';

const position = { x: 0, y: 0 };
let created_array = [];
let initial_data = routeElements.find(x => x.route_id === 1);
console.log(routeElements);
function loop(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].data.type === "split") {
      let true_route = routeElements.find(x => x.route_id == data[i].data.settings.true_path);
      created_array.push(data[i])
      loop(true_route.nodes)
      let false_route = routeElements.find(x => x.route_id == data[i].data.settings.false_path);
      loop(false_route.nodes)
    } else {
      created_array.push(data[i])
    }
  }
}

for (let i = 0; i < initial_data.nodes.length; i++) {
  if (initial_data.nodes[i].data.type === "split") {
    let true_route = routeElements.find(x => x.route_id == initial_data.nodes[i].data.settings.true_path);
    created_array.push(initial_data.nodes[i])
    loop(true_route.nodes)
    let false_route = routeElements.find(x => x.route_id == initial_data.nodes[i].data.settings.false_path);
    loop(false_route.nodes)
  } else {
    created_array.push(initial_data.nodes[i])
  }
}


console.log(created_array);
let edge_array = [];

function edge_loop(data,source,sourceHandle) {

  for (let i = 0; i < data.length; i++) {
    if (data[i].data.type === "split") {

    let true_route = routeElements.find(x => x.route_id == data[i].data.settings.true_path);
    edge_array.push({ id: 'e'+source +'-'+data[i].id , source: source, target: data[i].id,sourceHandle: sourceHandle,  type: 'custom', data: { source: source, target: data[i].id, id: 'e'+source +'-'+data[i].id , sourceHandle: sourceHandle }})
    edge_loop(true_route.nodes,data[i].id, 'a')
    let false_route = routeElements.find(x => x.route_id == data[i].data.settings.false_path);
    edge_loop(false_route.nodes,data[i].id, 'b')

    } else if(data[i].data.type === "email" || data[i].data.type === "delay"){
   
      edge_array.push({ id: 'e'+source +'-'+data[i].id , source: source, target: data[i].id,sourceHandle: sourceHandle,  type: 'custom',data: { source: source, target: data[i].id, id: 'e'+source +'-'+data[i].id, sourceHandle: sourceHandle } })
     
      source = data[i].id
      sourceHandle = ''
    }else {
      edge_array.push({ id: 'e'+source +'-'+data[i].id , source: source, target: data[i].id,sourceHandle: sourceHandle,  type: 'custom',data: { source: source, target: data[i].id, id: 'e'+source +'-'+data[i].id, sourceHandle: sourceHandle }})
    }
  }
}

for (let i = 1; i < initial_data.nodes.length; i++) {
  if (initial_data.nodes[i].data.type === "split") {
    let true_route = routeElements.find(x => x.route_id == initial_data.nodes[i].data.settings.true_path);
    edge_array.push({ id: 'e'+initial_data.nodes[i-1].id +'-'+initial_data.nodes[i].id , source: initial_data.nodes[i-1].id, target: initial_data.nodes[i].id, type: 'custom', data: { source: initial_data.nodes[i-1].id, target: initial_data.nodes[i].id, id: 'e'+initial_data.nodes[i-1].id +'-'+initial_data.nodes[i].id } })
    edge_loop(true_route.nodes,initial_data.nodes[i].id, 'a')

    let false_route = routeElements.find(x => x.route_id == initial_data.nodes[i].data.settings.false_path);
    edge_loop(false_route.nodes,initial_data.nodes[i].id, 'b')
  } else {
    if(i!==1){
      edge_array.push({ id: 'e'+initial_data.nodes[i-1].id +'-'+initial_data.nodes[i].id , source: initial_data.nodes[i-1].id, target: initial_data.nodes[i].id, type: 'custom', data: { source: initial_data.nodes[i-1].id, target: initial_data.nodes[i].id, id: 'e'+initial_data.nodes[i-1].id +'-'+initial_data.nodes[i].id } })
    }else{
      edge_array.push({ id: 'e'+initial_data.nodes[0].id +'-'+initial_data.nodes[i].id , source: initial_data.nodes[0].id , target: initial_data.nodes[i].id, type: 'custom', data: { source: initial_data.nodes[0].id , target: initial_data.nodes[i].id, id: 'e'+initial_data.nodes[0].id +'-'+initial_data.nodes[i].id } })
    }
  }
}
console.log(edge_array);

let a=created_array.concat(edge_array);
console.log(a);
const initial_elements = [
  { id: '1', type: 'input', data: { label: (<>node 1</>), }, routeId: '10' },
  { id: '2', data: { label: (<><Handle id={'2'} /></>) }, position, node: 'split', routeId_left: '1', routeId_right: '2' },
  { id: '3', data: { label: (<><Handle data={"Conditional"} id={'3'} /></>) }, position, node: 'split', routeId_left: '3', routeId_right: '4' },
  { id: '3a', custom_type: 'exit', type: 'output', data: { label: (<>EXIT</>) }, position, node: 'exit', style: { width: '55px' } },
  { id: '3b', custom_type: 'exit', type: 'output', data: { label: (<>EXIT</>) }, position, node: 'exit', style: { width: '55px' } },
  { id: '4', data: { label: (<><Handle data={"Conditional"} id={'4'} /></>), }, position, node: 'split', routeId_left: '5', routeId_right: '6' },
  { id: '4a', data: { label: (<><Node id={'4a'} />  </>), }, position, node: 'delay', routeId: '7', style: {}, },
  { id: '4aa', custom_type: 'exit', type: 'output', data: { label: (<>EXIT</>) }, position, node: 'exit', style: { width: '55px' } },
  { id: '4b', data: { label: (<><Handle data={"Conditional"} id={'4b'} /></>), }, position, node: 'split', routeId_left: '8', routeId_right: '9' },
  { id: '4ba', custom_type: 'exit', type: 'output', data: { label: (<>EXIT</>) }, position, node: 'exit', style: { width: '55px' } },
  { id: '4bb', custom_type: 'exit', type: 'output', data: { label: (<>EXIT</>) }, position, node: 'exit', style: { width: '55px' } },

  { id: 'e1-2', source: '1', target: '2', type: 'custom', data: { source: '1', target: '2', id: 'e1-2' } },
  { id: 'e2-3', source: '2', target: '3', type: 'custom', sourceHandle: 'a', data: { source: '2', target: '3', id: 'e2-3', sourceHandle: 'a' } },
  { id: 'e2-4', source: '2', target: '4', type: 'custom', sourceHandle: 'b', data: { source: '2', target: '4', id: 'e2-4', sourceHandle: 'b' } },
  { id: 'e3-3a', source: '3', target: '3a', type: 'custom', sourceHandle: 'a', data: { source: '3', target: '3a', id: 'e3-3a', sourceHandle: 'a' } },
  { id: 'e3-3b', source: '3', target: '3b', type: 'custom', sourceHandle: 'b', data: { source: '3', target: '3b', id: 'e3-3b', sourceHandle: 'b' } },
  { id: 'e4-4a', source: '4', target: '4a', type: 'custom', sourceHandle: 'a', data: { source: '4', target: '4a', id: 'e4-4a', sourceHandle: 'a' } },
  { id: 'e4a-4aa', source: '4a', target: '4aa', type: 'custom', data: { source: '4a', target: '4aa', id: 'e4a-4aa' } },
  { id: 'e4-4b', source: '4', target: '4b', type: 'custom', sourceHandle: 'b', data: { source: '4', target: '4b', id: 'e4-4b', sourceHandle: 'b' } },
  { id: 'e4b-4ba', source: '4b', target: '4ba', type: 'custom', sourceHandle: 'a', data: { source: '4b', target: '4ba', id: 'e4b-4ba', sourceHandle: 'a' } },
  { id: 'e4b-4bb', source: '4b', target: '4bb', type: 'custom', sourceHandle: 'b', data: { source: '4b', target: '4bb', id: 'e4b-4bb', sourceHandle: 'b' } },
]


export default a;