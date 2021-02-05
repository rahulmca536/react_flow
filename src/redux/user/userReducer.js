import {
  FETCH_USERS_SUCCESS,
} from './userTypes'

const initialState = {
  loading: false,
  users: [],
  error: ''
}

const reducer = (state = initialState, action) => { 
  switch (action.type) {

    case FETCH_USERS_SUCCESS: 
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ''
      }
    default: return state
  }
}

export default reducer
