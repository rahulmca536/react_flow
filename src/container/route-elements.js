import Handle from './Handle';
import Node from './Node';

const position = { x: 0, y: 0 };


const route_elements = [

    //     { "route_id": 1, "nodes": [
    //     { id: '1', data: { type: 'email',label: (<>node 1</>)}},
    //     { id: '4a', data: { type: 'delay',label: (<><Node id={'4a'} /></>)},position},
    //     { id: '2', data: { type: 'split',settings: { true_path: '2', false_path: '3' },label: (<><Handle id={'2'} /></>)},position},
    // ] },
    // { "route_id": 2, "nodes": [{ id: '3', data: { type: 'delay',label: (<><Node id={'4a'} /></>)},position},
    // { id: '3a', data: { type: 'exit',label: (<>EXIT</>)},position,style: { width: '55px' }},] },
    // { "route_id": 3, "nodes": [{ id: '4', data: { type: 'delay',label: (<><Node id={'4a'} /></>)},position},
    
    // { id: '34a', data: { type: 'exit',label: (<>EXIT</>)},position,style: { width: '55px' }},] },
    // { "route_id": 4, "nodes": [{ id: '3', data: { type: 'delay',label: (<><Node id={'4a'} /></>)},position},
    // { id: '3a', data: { type: 'exit',label: (<>EXIT</>)},position,style: { width: '55px' }},] },

    { "route_id": 1, "nodes": [
        { id: '1', data: { type: 'email',label: (<>node 1</>)}},
        
        { id: '2', data: { type: 'split',settings: { true_path: '2', false_path: '3' },label: (<><Handle id={'2'} /></>)},position},
    ] },
    { "route_id": 2, "nodes": [{ id: '3', data: { type: 'split',settings: { true_path: '4', false_path: '5' },label: (<><Handle id={'3'} /></>)},position}] },
    { "route_id": 3, "nodes": [
    { id: '4', data: { type: 'split',settings: { true_path: '6', false_path: '7' },label: (<><Handle id={'4'} /></>)},position}] },
    { "route_id": 4, "nodes": [{ id: '3a', data: { type: 'exit',label: (<>EXIT</>)},position,style: { width: '55px' }}] },
    { "route_id": 5, "nodes": [{ id: '3b', data: { type: 'exit',label: (<>EXIT</>)},position,style: { width: '55px' }}] },
    { "route_id": 6, "nodes": [{ id: '4a', data: { type: 'delay',label: (<><Node id={'4a'} /></>)},position},
    
                               { id: '4aa', data: { type: 'exit',label: (<>EXIT</>)},position,style: { width: '55px' }}] },
    { "route_id": 7, "nodes": [{ id: '4b', data: { type: 'split',settings: { true_path: '8', false_path: '9' },label: (<><Handle id={'4b'} /></>)},position}] },
    { "route_id": 8, "nodes": [{ id: '4ba', data: { type: 'exit',label: (<>EXIT</>)},position,style: { width: '55px' }}] },
    { "route_id": 9, "nodes": [{ id: '4bb', data: { type: 'exit',label: (<>eXIT</>)},position,style: { width: '55px' }}] },


    // { "route_id": 1, "nodes": ['2', '3', '3a', '3b'] },
    // { "route_id": 2, "nodes": ['2', '4', '4a', '4b', '4aa', '4ba', '4bb'] },
    // { "route_id": 3, "nodes": ['3', '3a'] },
    // { "route_id": 4, "nodes": ['3', '3b'] },
    // { "route_id": 5, "nodes": ['4', '4a', '4aa'] },
    // { "route_id": 6, "nodes": ['4', '4b', '4ba', '4bb'] },
    // { "route_id": 7, "nodes": ['4a'] },
    // { "route_id": 8, "nodes": ['4b', '4ba'] },
    // { "route_id": 9, "nodes": ['4b', '4bb'] },
    // { "route_id": 10, "nodes": ['1'] },
]

const route_elements_2 = [
    { "route_id": 1, "nodes": [
        { id: '1', data: { type: 'email' } },
        { id: '2', data: { type: 'delay' } },
        { id: '3', data: { type: 'split', settings: { true_path: '2', false_path: '3' } } }
    ] },
    { "route_id": '2', "nodes": [{ id: '4', data: { typ: 'email' } },] },
    { "route_id": '3', "nodes": [{ id: '5', data: { typ: 'email' } },] },
]

export default route_elements;