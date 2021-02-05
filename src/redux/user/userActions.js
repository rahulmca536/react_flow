import {

  FETCH_USERS_SUCCESS,

} from './userTypes'

export const addUsers = (data) => {

  return (dispatch) => {
    dispatch(fetchUsersSuccess(data))
  }
}

export const fetchUsersSuccess = data => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: data
  }
}


