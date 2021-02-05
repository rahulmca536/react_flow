import React from 'react'
import Card from 'react-bootstrap/Card';
import { FcCalendar } from "react-icons/fc";

export default function Card_head({  data }) {
    return (
        <>
                <div className="col-lg-10">
        <p><strong>{data.head}</strong> </p>
        </div>
        <div className="col-lg-2">
          <p><span class="text-right"><FcCalendar /></span></p>
        </div>
        </>
    )
}