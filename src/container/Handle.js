import React, { useState, } from 'react';
import { connect } from 'react-redux'
import { fetchroute, fetchUsersSuccess,fetchtoggle} from '../redux'
import { Handle } from 'react-flow-renderer';
import { Dropdown, Container, Row, Col } from "react-bootstrap";
import { Modal } from 'react-bootstrap';

import { MdFilterList } from "react-icons/md";
import { ImPower } from "react-icons/im";
import data_convert from './data_convert';
import Properties from './properties';
import { Rule } from 'json-rules-engine';
function Handlef({ data, id, rule, userData, addUsers, route, addroute,toggle}) {
  const [modalShow, setModalShow] = useState(false);



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
    toggle()
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
    toggle()
  }
  // console.log(rule.event.type);
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

  const property = (rule) => {
    const { Engine } = require('json-rules-engine')
    let engine = new Engine()
    engine.addRule({
      conditions: {
        any: [{
          all: [{
            fact: 'gameDuration',
            operator: 'equal',
            value: 40
          }, {
            fact: 'personalFoulCount',
            operator: 'greaterThanInclusive',
            value: 5
          }]
        }, {
          all: [{
            fact: 'gameDuration',
            operator: 'equal',
            value: 48
          }, {
            fact: 'personalFoulCount',
            operator: 'greaterThanInclusive',
            value: 6
          }]
        }]
      },
      event: {  // define the event to fire when the conditions evaluate truthy
        type: 'fouledOut',
        params: {
          message: 'Player has fouled out!'
        }
      }
    })
    engine
      .run(rule)
      .then(({ events }) => {
        events.map(event => console.log(event.params.message))
      })
  }
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="md"
      >
        <Modal.Body>
          <div className="container-fluid">
            <center>
              <img src="../retainful_true.png" widhth="100px" height="150px" alt="logo" onClick={() => handleDeleteyes(props.data.id)} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img src="../retainful_false.png" widhth="100px" height="150px" alt="logo" onClick={() => handleDeleteno(props.data.id)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img src="../retainful_both.png" widhth="100px" height="150px" alt="logo" />
            </center>
          </div>
        </Modal.Body>
      </Modal>
    );
  }


  return (
    <div >
      <Handle
        type="target"
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
      // style={{ background: '#fff' }}
      />
     
        <div style={{ position: 'relative' }} onClick={() =><Properties data={"sdsdd"}/>}>

          <Container>
            <Row>
              <Col xs={6} ><p >Split</p></Col>

              <Col xs={6}>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} />
                  <Dropdown.Menu size="sm" title="">
                    {/* <Dropdown.Header>Options</Dropdown.Header> */}
                    <Dropdown.Item onClick={() => setModalShow(true)}> Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  data={{ "id": id }}
                  onHide={() => setModalShow(false)}
                  aria-labelledby="example-custom-modal-styling-title"
                />
              </Col>
            </Row>
          </Container>
          <div style={{ "position": "absolute", "bottom": "-33px", "right": "55px", "background": "white" }}>Yes</div>
          <div style={{ "position": "absolute", "bottom": "-33px", "right": "5px", "background": "white" }}>NO</div>
        </div>
  
      <Handle
        type="source"
        position="bottom"
        id="a"
      />
      <Handle
        type="source"
        position="bottom"
        id="b"
        style={{ left: 120 }}
      />
    </div>
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
)(Handlef)