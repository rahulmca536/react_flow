import ReactTable from 'react-table'
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from '../components/dropdown.js';

function Reacttable() {

  // const { data, columns } = useState()
  const data = [
    {
      head: "Abandoned Cart",
      desc: "After someone Started Checkout, and Value equals 45 and Value doesn't equal 65 or Value doesn't equal 65. Only include someone if Created is in the last 30 days."
    }, {
      head: "ACart",
      desc: "After someone Started Checkout."
    }, {
      head: "Welcome Series - Customer v. Non-Customer",
      desc: "After someone is added to the list Subscriber. Only include someone if is in sample of 50% of people."
    },
    {
      head: "Abandoned Cart",
      desc: "After someone Started Checkout, and Value equals 45 and Value doesn't equal 65 or Value doesn't equal 65. Only include someone if Created is in the last 30 days."
    }, {
      head: "ACart",
      desc: "After someone Started Checkout."
    }, {
      head: "Welcome Series - Customer v. Non-Customer",
      desc: "After someone is added to the list Subscriber. Only include someone if is in sample of 50% of people."
    },
    {
      head: "Abandoned Cart",
      desc: "After someone Started Checkout, and Value equals 45 and Value doesn't equal 65 or Value doesn't equal 65. Only include someone if Created is in the last 30 days."
    }, {
      head: "ACart",
      desc: "After someone Started Checkout."
    }, {
      head: "Welcome Series - Customer v. Non-Customer",
      desc: "After someone is added to the list Subscriber. Only include someone if is in sample of 50% of people."
    },
    {
      head: "Abandoned Cart",
      desc: "After someone Started Checkout, and Value equals 45 and Value doesn't equal 65 or Value doesn't equal 65. Only include someone if Created is in the last 30 days."
    }, {
      head: "ACart",
      desc: "After someone Started Checkout."
    }, {
      head: "Welcome Series - Customer v. Non-Customer",
      desc: "After someone is added to the list Subscriber. Only include someone if is in sample of 50% of people."
    },
    {
      head: "Abandoned Cart",
      desc: "After someone Started Checkout, and Value equals 45 and Value doesn't equal 65 or Value doesn't equal 65. Only include someone if Created is in the last 30 days."
    }, {
      head: "ACart",
      desc: "After someone Started Checkout."
    }, {
      head: "Welcome Series - Customer v. Non-Customer",
      desc: "After someone is added to the list Subscriber. Only include someone if is in sample of 50% of people."
    },
    {
      head: "Abandoned Cart",
      desc: "After someone Started Checkout, and Value equals 45 and Value doesn't equal 65 or Value doesn't equal 65. Only include someone if Created is in the last 30 days."
    }, {
      head: "ACart",
      desc: "After someone Started Checkout."
    }, {
      head: "Welcome Series - Customer v. Non-Customer",
      desc: "After someone is added to the list Subscriber. Only include someone if is in sample of 50% of people."
    },
    {
      head: "Abandoned Cart",
      desc: "After someone Started Checkout, and Value equals 45 and Value doesn't equal 65 or Value doesn't equal 65. Only include someone if Created is in the last 30 days."
    }, {
      head: "ACart",
      desc: "After someone Started Checkout."
    }, {
      head: "Welcome Series - Customer v. Non-Customer",
      desc: "After someone is added to the list Subscriber. Only include someone if is in sample of 50% of people."
    },
    {
      head: "Abandoned Cart",
      desc: "After someone Started Checkout, and Value equals 45 and Value doesn't equal 65 or Value doesn't equal 65. Only include someone if Created is in the last 30 days."
    }, {
      head: "ACart",
      desc: "After someone Started Checkout."
    }, {
      head: "Welcome Series - Customer v. Non-Customer",
      desc: "After someone is added to the list Subscriber. Only include someone if is in sample of 50% of people."
    },
    {
      head: "Abandoned Cart",
      desc: "After someone Started Checkout, and Value equals 45 and Value doesn't equal 65 or Value doesn't equal 65. Only include someone if Created is in the last 30 days."
    }, {
      head: "ACart",
      desc: "After someone Started Checkout."
    }, {
      head: "Welcome Series - Customer v. Non-Customer",
      desc: "After someone is added to the list Subscriber. Only include someone if is in sample of 50% of people."
    },
    {
      head: "Abandoned Cart",
      desc: "After someone Started Checkout, and Value equals 45 and Value doesn't equal 65 or Value doesn't equal 65. Only include someone if Created is in the last 30 days."
    }, {
      head: "ACart",
      desc: "After someone Started Checkout."
    }, {
      head: "Welcome Series - Customer v. Non-Customer",
      desc: "After someone is added to the list Subscriber. Only include someone if is in sample of 50% of people."
    },
    {
      head: "Abandoned Cart",
      desc: "After someone Started Checkout, and Value equals 45 and Value doesn't equal 65 or Value doesn't equal 65. Only include someone if Created is in the last 30 days."
    }, {
      head: "ACart",
      desc: "After someone Started Checkout."
    }, {
      head: "Welcome Series - Customer v. Non-Customer",
      desc: "After someone is added to the list Subscriber. Only include someone if is in sample of 50% of people."
    }
  ];

  const columns = [{
    accessor: 'head',
    Cell: props =>

      <Card body style={{ height: '175px' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10">
              <td>
                <p><strong>{props.original.head}</strong></p>
                <p>{props.original.desc}</p>
              </td>
            </div>
            <div className="col-lg-2">
              <p ><Dropdown /></p>
            </div>

          </div>
        </div>
      </Card>
  }]

  return (
    <div >
      <ReactTable
        data={data}
        columns={columns}

        getTdProps={(state, makeTable, instance) => (<></>)} />

    </div>
  )
}

export default Reacttable
