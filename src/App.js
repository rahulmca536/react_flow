
import './App.css';
import { addUsers, addroute } from './redux'
import { connect } from 'react-redux'
import React, { useEffect } from 'react';
import Reactedge from './container/Edge.js';
import ReactFlow, { ReactFlowProvider, Controls, Background } from 'react-flow-renderer';

import routeElements from './container/route-elements';
import Layout from './container/Layout';
import data_convert from './container/data_convert';

const App = ({ addUsers, userData, addroute }) => {



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

  return (
    <div className="layoutflow" style={{ height: 1000 }}>
      <ReactFlowProvider>
        <ReactFlow
          elements={onLayout('TB')}
          edgeTypes={edgeTypes}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>

  );
}


const mapStateToProps = state => {
  return {
    userData: state.user.users
  }
}

export default connect(
  mapStateToProps, { addUsers, addroute },
)(App)