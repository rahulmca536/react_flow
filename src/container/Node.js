import React from 'react'
import { connect } from 'react-redux'
import { fetchroute, fetchUsersSuccess } from '../redux'
import data_convert from './data_convert';
import { Handle } from 'react-flow-renderer';


function Node({ id, userData, addUsers,route,addroute}) {


  const Delete = id => {

    let route_data_index = route.findIndex(x => x.nodes.find(y => y.id == id));
    route[route_data_index].nodes= route[route_data_index].nodes.filter(item=> item.id != id)

addroute(route)
addUsers(data_convert(route))
  }

  return (<>
    <Handle
      type="target"
      position="top"
      style={{ background: '#fff' }}
    />
    <small> <button onClick={() => Delete(id)}>Delete </button></small>
    <Handle
      type="source"
      position="bottom"
      style={{ background: '#fff' }}
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
)(Node)

