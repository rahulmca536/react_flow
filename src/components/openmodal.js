
import React, { useEffect,useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FcCalendar } from "react-icons/fc";
import { GrAddCircle } from "react-icons/gr";
import Cards from './cards/cards.js';
function MyVerticallyCenteredModal(props) {

  return (
    <Modal 
      {...props}
      size="xl"

    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className='row'>            
          {props.data.map((data,i)=>
            <Cards data={data}/>
            )}
          </div>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Openmodal() {

  const [modalShow, setModalShow] = useState(false);
  const modal_data = [{
    head: "Create from Scratch",
    caption: "Prefer a blank slate? Create your own flow from scratch",
    },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },{
    head: "Happy Birthday Email",
    caption: "Standard",
    desc: "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipients's birthday."
  },];
    return (
        <div>

        <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        data={modal_data}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
      />

        </div>
    )
}

export default Openmodal
