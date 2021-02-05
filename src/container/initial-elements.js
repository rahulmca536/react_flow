import Handle from './Handle';
const position = { x: 0, y: 0 };
const initial_elements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>node 1        </>
      ),
    },

  },
  {
    id: '2',
    data: {       label: (
      <><Handle/>      </>
    ), },
    position 
  },
  {
    id: '3',
    data: {       label: (
      <><Handle/>       </>
    ), },
    position 
  },

  {
    id: '3a',
    custom_type: 'exit',
    data: {
      label: (
        <>EXIT</>
      ),
    },
    position,
    style: {
      width: '55px'
    },
  },
    {
    id: '3b',
    custom_type: 'exit',
    data: {
      label: (
        <>EXIT</>
      ),
    },
    position,
    style: {
      width: '55px'
    },
  },
  {
    id: '4',

    data: {       label: (
      <><Handle/>     </>
    ), },
    position 
  },
  {
    id: '4a',
    data: {
      label: (
        <>Node</>
      ),
    },
    position,
    style: {
    },
  },
  {
    id: '4aa',
    custom_type: 'exit',
    data: {
      label: (
        <>EXIT</>
      ),
    },
    position,
    style: {
      width: '55px'
    },
  },
  {
    id: '4b',

    data: {       label: (
      <><Handle/>     </>
    ), },
    position 
  },
  {
    id: '4ba',
    custom_type: 'exit',
    data: {
      label: (
        <>EXIT</>
      ),
    },
    position,
    style: {
      width: '55px'
    },
  },
  {
    id: '4bb',
    custom_type: 'exit',
    data: {
      label: (
        <>EXIT</>
      ),
    },
    position,
    style: {
      width: '55px'
    },
  },
  { id: 'e1-2', source: '1', target: '2', type: 'custom', data: { source: '1', target: '2', id: 'e1-2',routeId:'e1-2' } },
  { id: 'e2-3', source: '2', target: '3', type: 'custom',sourceHandle:'a', data: { source: '2', target: '3', id: 'e2-3',sourceHandle:'a' ,routeId:'e2-3'} },
  { id: 'e2-4', source: '2', target: '4', type: 'custom',sourceHandle:'b', data: { source: '2', target: '4', id: 'e2-4',sourceHandle:'b',routeId:'e2-4' } },
  { id: 'e3-3a', source: '3', target: '3a', type: 'custom',sourceHandle:'a', data: { source: '3', target: '3a', id: 'e3-3a',sourceHandle:'a',routeId:'e3-3a' } },
  { id: 'e3-3b', source: '3', target: '3b', type: 'custom',sourceHandle:'b', data: { source: '3', target: '3b', id: 'e3-3b',sourceHandle:'b' ,routeId:'e3-3b'} },
  { id: 'e4-4a', source: '4', target: '4a', type: 'custom',sourceHandle:'a', data: { source: '4', target: '4a', id: 'e4-4a' ,sourceHandle:'a',routeId:'e4-4a'} },
  { id: 'e4a-4aa', source: '4a', target: '4aa', type: 'custom', data: { source: '4a', target: '4aa', id: 'e4a-4aa' ,routeId:'e4a-4aa'} },
  { id: 'e4-4b', source: '4', target: '4b', type: 'custom',sourceHandle:'b', data: { source: '4', target: '4b', id: 'e4-4b' ,sourceHandle:'b',routeId:'e4-4b'} },
  { id: 'e4b-4ba', source: '4b', target: '4ba', type: 'custom',sourceHandle:'a', data: { source: '4b', target: '4ba', id: 'e4b-4ba' ,sourceHandle:'a',routeId:'e4b-4ba'} },
  { id: 'e4b-4bb', source: '4b', target: '4bb', type: 'custom',sourceHandle:'b', data: { source: '4b', target: '4bb', id: 'e4b-4bb',sourceHandle:'b' ,routeId:'e4b-4bb'} },
]
export default initial_elements;