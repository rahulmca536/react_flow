import React from 'react'
import { Handle } from 'react-flow-renderer';
const Node = () => {
    return (
      <>
        <Handle
          type="target"
          position="top"
          onConnect={(params) => console.log('handle onConnect', params)}
        />
        <>
          <div style={{ position: 'relative' }}>
            <small>Conditional Split</small><br/>

            <div style={{ "position": "absolute", "bottom": "-20px", "right": "40px", "background": "white" }}>Yes</div>
            <div style={{ "position": "absolute", "bottom": "-20px", "right": "-10px", "background": "white" }}>NO</div>
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
          style={{ background: '#555', left: 90 }}
        />

      </>
    );
  };

export default Node
