import React from 'react'
import { connect } from 'react-redux'
import { fetchroute, fetchUsersSuccess } from '../redux'
import { Handle } from 'react-flow-renderer';
import data_convert from './data_convert';
function Test({ data, id, userData, addUsers, route, addroute }) {
  const position = { x: 0, y: 0 };

  const handleDeleteyes = id => {


    let route_data = route.find(x => x.nodes.find(y => y.id == id));
    let node_data = route_data.nodes.find(x => x.id == id);      
    let edge_source_data = userData.find(x => x.target == id);
    if (edge_source_data.sourceHandle) {

        delete_nodes(route_data.nodes[route_data.nodes.length - 1].data.settings.true_path)
        route = route.filter(item=> item.route_id !== route_data.route_id)

        function delete_nodes(path) {

          let new_route_data = route.find(x => x.route_id == path);
            if (new_route_data.nodes[new_route_data.nodes.length - 1].data.type === "split") {
              delete_nodes(node_data[node_data.length - 1].data.settings.true_path)
              delete_nodes(node_data[node_data.length - 1].data.settings.false_path)
              route = route.filter(item=> item.route_id != path)
            }else{      
        route = route.filter(item=> item.route_id != path)
            }
        }
      
      let source_route_data = route.find(x => x.nodes.find(y => y.id == edge_source_data.source));
      let source_route_data_index = route.findIndex(x => x.nodes.find(y => y.id == edge_source_data.source));
      let source_data = source_route_data.nodes.find(x => x.id == edge_source_data.source);console.log(source_data);
      let source_data_index= source_route_data.nodes.findIndex(x => x.id == edge_source_data.source);
      // true_path: edge_source_data.sourceHandle ==='a' ? node_data.data.settings.false_path : source_data.data.settings.true_path, false_path: edge_source_data.sourceHandle ==='b' ? node_data.data.settings.false_path : source_data.data.settings.false_path 
      route[source_route_data_index].nodes[source_data_index] =  { id: source_data.id, data: { type: "split",settings: {true_path: "6", false_path: "9"},label: (<></>)},position}
    console.log(route[source_route_data_index].nodes[source_data_index]);
    } else {

    }
console.log(JSON.stringify(route));
    addroute(route)
    addUsers(data_convert(route))



    //     let concat_node_id = userData.find(x => x.source == id && x.sourceHandle === 'b').target
    //     let edge_data = userData.find(x => x.target == id)
    //     let edge_index = userData.findIndex((el) => el.id === edge_data.id);
    //     userData[edge_index] = { id: 'e' + edge_data.source + '-' + concat_node_id, source: edge_data.source, target: concat_node_id, type: edge_data.type, sourceHandle: edge_data.sourceHandle, data: { id: 'e' + edge_data.source + '-' + concat_node_id, source: edge_data.source, target: concat_node_id, sourceHandle: edge_data.sourceHandle } }

    //     let routeId_left = userData.find(x => x.id == id).routeId_left
    //     let nodes = route.find(x => x.route_id == routeId_left).nodes
    // console.log(nodes);
    //     for (let i = 0; i < nodes.length; i++) {
    //       userData = userData.filter(function (item) {
    //         return item.id !== nodes[i] && item.source !== nodes[i] && item.target !== nodes[i]
    //       })
    //     }
    //     addUsers(userData)

  }

  const handleDeleteno = id => {

    let concat_node_id = userData.find(x => x.source == id && x.sourceHandle === 'a').target
    let edge_data = userData.find(x => x.target == id)
    let edge_index = userData.findIndex((el) => el.id === edge_data.id);
    userData[edge_index] = { id: 'e' + edge_data.source + '-' + concat_node_id, source: edge_data.source, target: concat_node_id, type: edge_data.type, sourceHandle: edge_data.sourceHandle, data: { id: 'e' + edge_data.source + '-' + concat_node_id, source: edge_data.source, target: concat_node_id, sourceHandle: edge_data.sourceHandle } }

    let routeId_right = userData.find(x => x.id == id).routeId_right
    let nodes = route.find(x => x.route_id == routeId_right).nodes
    console.log(nodes);
    for (let i = 0; i < nodes.length; i++) {
      userData = userData.filter(function (item) {
        return item.id !== nodes[i] && item.source !== nodes[i] && item.target !== nodes[i]
      })
      //  userData = userData.filter(function(item) {
      //   return item.source !== nodes[i] && item.target !== nodes[i] 
      // })
    }
    console.log(userData);
    addUsers(userData)
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
)(Test)