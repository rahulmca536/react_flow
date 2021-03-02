import {

  FETCH_USERS_SUCCESS,FETCH_ROUTE_ARRAY, TOGGLE_SHOW

} from './userTypes'

export const addUsers = (data) => {

  return (dispatch) => {
    dispatch(fetchUsersSuccess(data))
  }
}
export const addroute = (data) => {

  return (dispatch) => {
    dispatch(fetchroute(data))
  }
}
export const toggle = (data) => {

  return (dispatch) => {
    dispatch(fetchtoggle(data))
  }
}

export const fetchUsersSuccess = data => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: data
  }
}
export const fetchroute = data => {
  return {
    type: FETCH_ROUTE_ARRAY,
    payload: data
  }
}
export const fetchtoggle = data => {
  return {
    type: TOGGLE_SHOW,
    payload: data
  }
}

