import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';

import { connect } from 'react-redux'

export const PrivateRoute = ({isAuthenticated,token, component: Component, ...rest}) => {

  return (
    <Route
      {...rest}
      render={props =>
        !token && !isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...rest} />
        )
      }
    />
  );
};



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
  mapStateToProps, null,
)(PrivateRoute)