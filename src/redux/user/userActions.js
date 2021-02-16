import {

  FETCH_USERS_SUCCESS,FETCH_ROUTE_ARRAY

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

