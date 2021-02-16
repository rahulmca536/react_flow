import React from 'react'
import { connect } from 'react-redux'
import { fetchroute, fetchUsersSuccess } from '../redux'
import { Handle } from 'react-flow-renderer';
import { Test } from './Test'

import data_convert from './data_convert';
function handle({ data, id, userData, addUsers, route, addroute }) {
  const position = { x: 0, y: 0 };

  const handleDeleteyes = id => {

    let route_data = route.find(x => x.nodes.find(y => y.id == id));
    let node_data = route_data.nodes.find(x => x.id == id);
    let edge_source_data = userData.find(x => x.target == id);
    if (edge_source_data.sourceHandle) {

      delete_nodes(route_data.nodes[route_data.nodes.length - 1].data.settings.true_path)
      route = route.filter(item => item.route_id !== route_data.route_id)

      function delete_nodes(path) {

        let new_route_data = route.find(x => x.route_id == path);
        if (new_route_data.nodes[new_route_data.nodes.length - 1].data.type === "split") {
          delete_nodes(new_route_data.nodes[new_route_data.nodes.length - 1].data.settings.true_path)
          delete_nodes(new_route_data.nodes[new_route_data.nodes.length - 1].data.settings.false_path)
          route = route.filter(item => item.route_id != path)
        } else {
          route = route.filter(item => item.route_id != path)
        }
      }

      let source_route_data = route.find(x => x.nodes.find(y => y.id == edge_source_data.source));
      let source_route_data_index = route.findIndex(x => x.nodes.find(y => y.id == edge_source_data.source));
      let source_data = source_route_data.nodes.find(x => x.id == edge_source_data.source);
      let source_data_index = source_route_data.nodes.findIndex(x => x.id == edge_source_data.source);
      route[source_route_data_index].nodes[source_data_index] = {
        id: source_data.id, data: {
          type: "split", settings: {
            true_path: edge_source_data.sourceHandle === 'a' ? node_data.data.settings.false_path : source_data.data.settings.true_path, false_path: edge_source_data.sourceHandle === 'b' ? node_data.data.settings.false_path : source_data.data.settings.false_path
          }, label: source_data.data.label
        }, position
      }

    } else {
      let route_data_index = route.findIndex(x => x.nodes.find(y => y.id == id));
      let node_data_index = route_data.nodes.findIndex(x => x.id == id);
      let false_path = route[route_data_index].nodes[node_data_index].data.settings.false_path

      let false_path_node_data = route.find(x => x.route_id == false_path).nodes
      route = route.filter(item => item.route_id != false_path)


      delete_nodes(route[route_data_index].nodes[node_data_index].data.settings.true_path)

      for (let i = 0; i < false_path_node_data.length; i++) {
        route[route_data_index].nodes[node_data_index + i] = false_path_node_data[i]
      }




      function delete_nodes(path) {

        let new_route_data = route.find(x => x.route_id == path);
        if (new_route_data.nodes[new_route_data.nodes.length - 1].data.type === "split") {
          delete_nodes(new_route_data.nodes[new_route_data.nodes.length - 1].data.settings.true_path)
          delete_nodes(new_route_data.nodes[new_route_data.nodes.length - 1].data.settings.false_path)
          route = route.filter(item => item.route_id != path)
        } else {
          route = route.filter(item => item.route_id != path)
        }
      }





    }
    addroute(route)
    addUsers(data_convert(route))

  }

  const handleDeleteno = id => {

    let route_data = route.find(x => x.nodes.find(y => y.id == id));
    let node_data = route_data.nodes.find(x => x.id == id);
    let edge_source_data = userData.find(x => x.target == id);
    if (edge_source_data.sourceHandle) {

      delete_nodes(route_data.nodes[route_data.nodes.length - 1].data.settings.false_path)
      route = route.filter(item => item.route_id !== route_data.route_id)

      function delete_nodes(path) {


        let new_route_data = route.find(x => x.route_id == path);

        if (new_route_data.nodes[new_route_data.nodes.length - 1].data.type === "split") {

          delete_nodes(new_route_data.nodes[new_route_data.nodes.length - 1].data.settings.true_path)
          delete_nodes(new_route_data.nodes[new_route_data.nodes.length - 1].data.settings.false_path)
          route = route.filter(item => item.route_id != path)
        } else {
          route = route.filter(item => item.route_id != path)
        }
      }

      let source_route_data = route.find(x => x.nodes.find(y => y.id == edge_source_data.source));
      let source_route_data_index = route.findIndex(x => x.nodes.find(y => y.id == edge_source_data.source));
      let source_data = source_route_data.nodes.find(x => x.id == edge_source_data.source); 
      let source_data_index = source_route_data.nodes.findIndex(x => x.id == edge_source_data.source);
      route[source_route_data_index].nodes[source_data_index] = {
        id: source_data.id, data: {
          type: "split", settings: {
            true_path: edge_source_data.sourceHandle === 'a' ? node_data.data.settings.true_path : source_data.data.settings.true_path, false_path: edge_source_data.sourceHandle === 'b' ? node_data.data.settings.true_path : source_data.data.settings.false_path
          }, label: source_data.data.label
        }, position
      }

    } else {
      let route_data_index = route.findIndex(x => x.nodes.find(y => y.id == id));
      let node_data_index = route_data.nodes.findIndex(x => x.id == id);
      let true_path = route[route_data_index].nodes[node_data_index].data.settings.true_path

      let true_path_node_data = route.find(x => x.route_id == true_path).nodes

      route = route.filter(item => item.route_id != true_path)


      delete_nodes(route[route_data_index].nodes[node_data_index].data.settings.false_path)

      for (let i = 0; i < true_path_node_data.length; i++) {
        route[route_data_index].nodes[node_data_index + i] = true_path_node_data[i]
      }

      function delete_nodes(path) {

        let new_route_data = route.find(x => x.route_id == path);
        if (new_route_data.nodes[new_route_data.nodes.length - 1].data.type === "split") {
          delete_nodes(new_route_data.nodes[new_route_data.nodes.length - 1].data.settings.true_path)
          delete_nodes(new_route_data.nodes[new_route_data.nodes.length - 1].data.settings.false_path)
          route = route.filter(item => item.route_id != path)
        } else {
          route = route.filter(item => item.route_id != path)
        }
      }


    }

    addroute(route)
    addUsers(data_convert(route))
  }


  return (
    <>
      <Handle
        type="target"
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#fff' }}
      />
      <>
        <div style={{ position: 'relative' }}>
          <small> <button onClick={() => handleDeleteyes(id)}>Delete yes</button></small>
          <small> <button onClick={() => handleDeleteno(id)}>Delete no</button></small>

          <div style={{ "position": "absolute", "bottom": "-33px", "right": "55px", "background": "white" }}>Yes</div>
          <div style={{ "position": "absolute", "bottom": "-33px", "right": "5px", "background": "white" }}>NO</div>
        </div>
      </>
      <Handle
        type="source"
        position="bottom"
        id="a"
      />
      <Handle
        type="source"
        position="bottom"
        id="b"
        style={{ background: '#fff', left: 120 }}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addUsers: (userData) => dispatch(fetchUsersSuccess(userData)),
    addroute: (routeData) => dispatch(fetchroute(routeData))
  }
}
const mapStateToProps = state => {
  return {
    userData: state.user.users,
    route: state.user.route
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps,
)(handle)