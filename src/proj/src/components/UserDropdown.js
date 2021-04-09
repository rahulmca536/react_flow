import React from "react";
import Popper from "popper.js";
import { connect } from 'react-redux'
import { logout } from '../redux'

const UserDropdown = ({logout}) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-gray-600 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={e => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
        }
        style={{ minWidth: "12rem" }}
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full text-center whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={e => e.preventDefault()}
        >
          Profile
        </a>
        <a
      href=""
          className={
            "text-sm py-2 px-4 font-normal block w-full text-center whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={() => logout()}
        >
          Logout
        </a>
      </div>
    </>
  );
};



const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())

  }
}
const mapStateToProps = state => {
  return {
    userData: state.user.users,
    route: state.user.route,
    token: state.user.token,
    isAuthenticated: state.user.isAuthenticated,
    error: state.user.error

  }
}   
export default connect(
  mapStateToProps, mapDispatchToProps,
)(UserDropdown)