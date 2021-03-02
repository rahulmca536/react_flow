const route_elements1 = [

    // { "route_id": 1, "nodes": [
    //     { id: '1',type: 'input', data: { type: 'trigger',label: (<>Trigger </>)}},
        
    //     { id: '2', data: { type: 'split',settings: { true_path: '2', false_path: '3' }, 
    //     rule:a,label: (<><Handle id={'2'} rule={{personalFoulCount: 5,gameDuration: 40}}/></>)},position},
    // ] },
    // { "route_id": 2, "nodes": [{ id: '3', data: { type: 'split',settings: { true_path: '4', false_path: '5' },label: (<><Handle id={'3'}  /></>)},position}] },
    // { "route_id": 3, "nodes": [
    // { id: '4', data: { type: 'split',settings: { true_path: '6', false_path: '7' },label: (<><Handle id={'4'} rule={{personalFoulCount: 6,gameDuration: 48}} /></>)},position}] },
    // { "route_id": 4, "nodes": [{ id: '3a',type: 'output', data: { type: 'exit',label: (<>EXIT</>)},position,style: {  }}] },
    // { "route_id": 5, "nodes": [{ id: '3b',type: 'output', data: { type: 'exit',label: (<>EXIT</>)},position,style: {  }}] },
    // { "route_id": 6, "nodes": [{ id: '4a', data: { type: 'delay',label: (<><Node id={'4a'} data={"delay"} /></>)},position},
    
    //                            { id: '4aa', type: 'output',data: { type: 'exit',label: (<>EXIT</>)},position,style: {  }}] },
    // { "route_id": 7, "nodes": [{ id: '4b', data: { type: 'split',settings: { true_path: '8', false_path: '9' },label: (<><Handle id={'4b'} rule={{personalFoulCount: 5,gameDuration: 48}} /></>)},position}] },
    // { "route_id": 8, "nodes": [{ id: '4ba',type: 'output', data: { type: 'exit',label: (<>EXIT</>)},position,style: {  }}] },
    // { "route_id": 9, "nodes": [{ id: '4bb',type: 'output', data: { type: 'exit',label: (<>EXIT</>)},position,style: { }}] },


    { "route_id": 1, "nodes": [
        { id: 'gul', type: 'input',data: { type: 'trigger',label: (<>Trigger</>)}},
        
        { id: 'gulgul', type: 'output',data: { type: 'exit',label: (<>EXIT</>)},style: { }}
    ] },
    // { "route_id": 1, "nodes": [
    //     { id: 'ndd', type: 'input',data: { type: 'trigger',label: (<>Trigger 1</>)}},
        
    //     { id: 'fb', type: 'output',data: { type: 'split',settings: { true_path: '2', false_path: '3' },label: (<><Handle id={'245'}/></>)},style: { }},
    // ] },
    // { "route_id": 2, "nodes": [
    //     { id: 'bfb', type: 'input',data: { type: 'delay',label: (<><Node id={'270'} data={"delay"}/></>)}},
        
    //     { id: 'bbb', type: 'output',data: { type: 'exit',label: (<>EXIT 2</>)},style: { }}
    // ] },
    // { "route_id": 3, "nodes": [
      
    //     { id: 'f', type: 'output',data: { type: 'exit',label: (<>EXIT 60</>)},style: { }}
    // ] },
]




export default route_elements1;