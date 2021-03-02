
import './App.css';
import { addUsers, addroute,toggle} from './redux'
import { connect } from 'react-redux'
import React, { useEffect,useState} from 'react';

import Reactedge from './container/Edge.js';
import ReactFlow,{Controls,ReactFlowProvider, Background} from 'react-flow-renderer';
import routeElements from './container/route-elements';
import Layout from './container/Layout';
import data_convert from './container/data_convert';
import Properties from './container/properties';
import { Container,Row,Col } from 'react-bootstrap';

const App = ({ addUsers, userData, addroute,toggle,togglee}) => {

  const [dataShow, setdataShow] = useState(false);

  useEffect(() => {
    addUsers(data_convert(routeElements));
    addroute(routeElements)
   
  }, []);

  const edgeTypes = {
    custom: Reactedge,
  };

  const onLayout = (direction) => {
    return Layout(userData, direction);
  }
  const onElementClick = (event, element) =>  {setdataShow(true); toggle(element)}

  return (
    <Container fluid>
      <Row>
        <Col xs={10}>
        <div className="layoutflow" style={{ height: 1000 }}>
        <ReactFlowProvider>
        <ReactFlow
          elements={onLayout('TB')}
          onElementClick={onElementClick}
          snapToGrid
          edgeTypes={edgeTypes}
        />
        </ReactFlowProvider>
    </div></Col>
        <Col xs={2}>
{!dataShow && (<Properties  />)}
{dataShow && (<Properties data={togglee}  />)}
        </Col>
      </Row>
    </Container>


  );
}


const mapStateToProps = state => {
  return {
    userData: state.user.users,
    togglee: state.user.toggle
  }
}

export default connect(
  mapStateToProps, { addUsers, addroute, toggle },
)(App)