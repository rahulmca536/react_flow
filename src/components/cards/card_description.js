import React from 'react'
import Card from 'react-bootstrap/Card';
import { FcCalendar } from "react-icons/fc";

export default function Card_description({  data }) {
    return (
        <>
        <div className="col-lg-12">
        <p><small>{data.caption}</small></p>
          <p>{data.desc}</p>
        </div>
        </>
    )
}