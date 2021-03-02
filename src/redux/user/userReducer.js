import {
  FETCH_USERS_SUCCESS,FETCH_ROUTE_ARRAY,TOGGLE_SHOW
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
      case TOGGLE_SHOW: 
      return {
        ...state,
        loading: false,
        toggle: action.payload,
        error: ''
      }
    default: return state
  }
}

export default reducer
