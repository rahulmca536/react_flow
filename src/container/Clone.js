import React from 'react'
import { connect } from 'react-redux'
import { fetchroute, fetchUsersSuccess,fetchtoggle } from '../redux'
import data_convert from './data_convert';
import Node from './Node';
import { Handle } from 'react-flow-renderer';
import {Dropdown,Container,Row,Col} from "react-bootstrap";

const position = { x: 0, y: 0 };
function Test({ id,data, userData, addUsers,route,addroute,toggle}) {


  const Delete = id => {
    console.log(route);
    let route_data_index = route.findIndex(x => x.nodes.find(y => y.id == id));
    route[route_data_index].nodes= route[route_data_index].nodes.filter(item=> item.id != id)

addroute(route)
addUsers(data_convert(route))
toggle()
  }
  const clone = id =>{

    function random_num() {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 5; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }
  console.log(route);
  // let routeElements = [...route]

        let route_data = route.find(x => x.nodes.find(y => y.id == id)); 
        let route_index = route.findIndex(x => x.nodes.find(y => y.id == id));
        let source_node_index = route_data.nodes.findIndex(x => x.id == id);
        let node_data = route_data.nodes.find(x => x.id == id);console.log(node_data);
        if(node_data.data.type === "email"){
        let created_node_route_id = random_num()
          if(node_data.subject){
            route[route_index].nodes.splice(source_node_index + 1, 0, { id: created_node_route_id.toString(), data: { type: 'email', label: (<><Node id={created_node_route_id.toString()} data={"email"} /> </>) }, position, subject:node_data.subject },)
          }else{
            route[route_index].nodes.splice(source_node_index + 1, 0, { id: created_node_route_id.toString(), data: { type: 'email', label: (<><Node id={created_node_route_id.toString()} data={"email"} /> </>) }, position },)
          }
          console.log(route[route_index].nodes[source_node_index+1]);
          addroute(route)
          addUsers(data_convert(route))
        }
        if(node_data.data.type === "delay"){
        let created_node_route_id = random_num()
          if(node_data.delay || node_data.duration){
            route[route_index].nodes.splice(source_node_index + 1, 0, { id: created_node_route_id.toString(), data: { type: 'delay', label: (<><Node id={created_node_route_id.toString()} data={"delay"} /> </>) }, position, delay:node_data.delay, duration:node_data.duration},)
          }else{
            route[route_index].nodes.splice(source_node_index + 1, 0, { id: created_node_route_id.toString(), data: { type: 'delay', label: (<><Node id={created_node_route_id.toString()} data={"delay"} /> </>) }, position },)
          }
          console.log(route[route_index].nodes[source_node_index+1]);
          addroute(route)
          addUsers(data_convert(route))
        }


  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
     
      <span className="threedots" />
    </a>
  ));
  

  return (<>
    <Handle
      type="target"
      position="top"

    />
    <>
    <Container>
  <Row>
    
    <Col><p>{data}</p></Col>
    <Col>    <Dropdown>
    <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu size="sm" title="">
          {/* <Dropdown.Header>Options</Dropdown.Header> */}
          <Dropdown.Item onClick={() => Delete(id)}>Delete</Dropdown.Item>
          <Dropdown.Item onClick={() => clone(id)}>Clone</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </Col>
  </Row>
</Container>
    </>
    <p>
    {/* <small> <button onClick={() => Delete(id)}>Delete </button></small> */}

      </p>
    <Handle
      type="source"
      position="bottom"

    />
  </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addUsers: (userData) => dispatch(fetchUsersSuccess(userData)),
    addroute: (routeData) => dispatch(fetchroute(routeData)),
    toggle: (Data) => dispatch(fetchtoggle(Data))
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

