import React from 'react'
// import routeElements from './route-elements';

const data_convert = (routeElements) => {
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

  function edge_loop(data, source, sourceHandle) {

    for (let i = 0; i < data.length; i++) {
      if (data[i].data.type === "split") {

        let true_route = routeElements.find(x => x.route_id == data[i].data.settings.true_path);
        edge_array.push({ id: 'e' + source + '-' + data[i].id, source: source, target: data[i].id, sourceHandle: sourceHandle, type: 'custom', data: { source: source, target: data[i].id, id: 'e' + source + '-' + data[i].id, sourceHandle: sourceHandle } })
        edge_loop(true_route.nodes, data[i].id, 'a')
        let false_route = routeElements.find(x => x.route_id == data[i].data.settings.false_path);
        edge_loop(false_route.nodes, data[i].id, 'b')

      } else if (data[i].data.type === "email" || data[i].data.type === "delay") {

        edge_array.push({ id: 'e' + source + '-' + data[i].id, source: source, target: data[i].id, sourceHandle: sourceHandle, type: 'custom', data: { source: source, target: data[i].id, id: 'e' + source + '-' + data[i].id, sourceHandle: sourceHandle } })

        source = data[i].id
        sourceHandle = ''
      } else {
        edge_array.push({ id: 'e' + source + '-' + data[i].id, source: source, target: data[i].id, sourceHandle: sourceHandle, type: 'custom', data: { source: source, target: data[i].id, id: 'e' + source + '-' + data[i].id, sourceHandle: sourceHandle } })
      }
    }
  }

  for (let i = 1; i < initial_data.nodes.length; i++) {
    if (initial_data.nodes[i].data.type === "split") {
      let true_route = routeElements.find(x => x.route_id == initial_data.nodes[i].data.settings.true_path);
      edge_array.push({ id: 'e' + initial_data.nodes[i - 1].id + '-' + initial_data.nodes[i].id, source: initial_data.nodes[i - 1].id, target: initial_data.nodes[i].id, type: 'custom', data: { source: initial_data.nodes[i - 1].id, target: initial_data.nodes[i].id, id: 'e' + initial_data.nodes[i - 1].id + '-' + initial_data.nodes[i].id } })
      edge_loop(true_route.nodes, initial_data.nodes[i].id, 'a')

      let false_route = routeElements.find(x => x.route_id == initial_data.nodes[i].data.settings.false_path);
      edge_loop(false_route.nodes, initial_data.nodes[i].id, 'b')
    } else {
      if (i !== 1) {
        edge_array.push({ id: 'e' + initial_data.nodes[i - 1].id + '-' + initial_data.nodes[i].id, source: initial_data.nodes[i - 1].id, target: initial_data.nodes[i].id, type: 'custom', data: { source: initial_data.nodes[i - 1].id, target: initial_data.nodes[i].id, id: 'e' + initial_data.nodes[i - 1].id + '-' + initial_data.nodes[i].id } })
      } else {
        edge_array.push({ id: 'e' + initial_data.nodes[0].id + '-' + initial_data.nodes[i].id, source: initial_data.nodes[0].id, target: initial_data.nodes[i].id, type: 'custom', data: { source: initial_data.nodes[0].id, target: initial_data.nodes[i].id, id: 'e' + initial_data.nodes[0].id + '-' + initial_data.nodes[i].id } })
      }
    }
  }

  console.log(edge_array);

  return created_array.concat(edge_array);

}

export default data_convert
