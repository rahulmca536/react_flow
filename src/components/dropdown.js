import React from 'react'
import {Dropdown,DropdownButton }from 'react-bootstrap';
function dropdown() {
    return (
        <div>
                <DropdownButton

      title=" Edit Flow "
      id="input-group-dropdown-1"
    >
      <Dropdown.Item href="#">Edit Details</Dropdown.Item>
      <Dropdown.Item href="#">Clone</Dropdown.Item>
      <Dropdown.Item href="#">Delete</Dropdown.Item>
      {/* <Dropdown.Divider />
      <Dropdown.Item href="#">Separated link</Dropdown.Item> */}
    </DropdownButton>
        </div>
    )
}

export default dropdown
