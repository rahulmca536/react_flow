import React from 'react'
import Card from 'react-bootstrap/Card';
import { FcCalendar } from "react-icons/fc";
import Card_head from './card_head.js';
import Card_description from './card_description.js';

export default function Cards({  data }) {
    const divStyle = {
        padding: '10px'
      };
    return (
        <div style={divStyle} className="col-lg-3">
        <Card  body body className="text-center">
        <div className='row'>
          <Card_head data={data}/>
<Card_description data={data} />
        </div>
        </Card>
      </div>
    )
}