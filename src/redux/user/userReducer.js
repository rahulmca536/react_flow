import {
  FETCH_USERS_SUCCESS,FETCH_ROUTE_ARRAY
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
      case FETCH_ROUTE_ARRAY: 
      return {
        ...state,
        loading: false,
        route: action.payload,
        error: ''
      }
    default: return state
  }
}

export default reducer
