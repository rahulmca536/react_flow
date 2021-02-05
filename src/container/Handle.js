import React from 'react'
import  { Handle} from 'react-flow-renderer';
export default function handle({data}) {
    return (
<>
      <Handle
        type="target"
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <>
        <div style={{ position: 'relative' }}>
          <small> {data} Split </small><br/>
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
        style={{ background: '#555', left: 120 }}
      />
    </>
    )
}


