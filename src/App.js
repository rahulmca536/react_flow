
import './App.css';
import {  addUsers } from './redux'
import { connect } from 'react-redux'
import React, { useEffect} from 'react';
import Reactedge from './container/Edge.js';
import ReactFlow, {ReactFlowProvider,Controls,Background} from 'react-flow-renderer';
import initialElements from './container/initial-elements';
import Layout from './container/Layout';

const App = ({ addUsers, userData }) => { 
  useEffect(() => {  
    addUsers(initialElements);
  }, []);  

  const edgeTypes = {
    custom: Reactedge,
  }; 

  const onLayout =  (direction) => {
    console.log(Layout(userData,direction));
    return Layout(userData,direction);
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
  mapStateToProps, { addUsers },
)(App)