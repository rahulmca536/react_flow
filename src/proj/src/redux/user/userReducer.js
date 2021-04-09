import {
  FETCH_USERS_SUCCESS,FETCH_ROUTE_ARRAY,TOGGLE_SHOW,CLEAR_ERROR,SET_ERROR,USER_LOADING,
  TENANT_SET_AUTH_LOADING,TENANT_LOGIN_SUCCESS,TENANT_LOGIN_FAIL,TENANT_REGISTER_SUCCESS,TENANT_USER_LOADED,TENANT_AUTH_ERROR,TENANT_REGISTER_FAIL,TENANT_LOGOUT
} from './userTypes'


const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  loading: false,
  loading_flag: false,
  error: null,
  success: false,
  tenant_setting: null,
  email_sent: null,
  account_verification: null,
};

const Reducer = (state = initialState, action) => { 


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
      case TENANT_SET_AUTH_LOADING: 
      return {
        ...state,
        loading_flag: true,
      }

      case TENANT_REGISTER_SUCCESS: 
      case TENANT_LOGIN_SUCCESS: 
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        loading: false,
        loading_flag: false,
      }

      case TENANT_REGISTER_FAIL:
        case TENANT_LOGIN_FAIL:
        case TENANT_AUTH_ERROR:
        case TENANT_LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        loading_flag: false,
        user: null,
        error: action.payload,
        email_sent: null,
        account_verification: null,
      };

      case TENANT_USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          loading_flag: false,
          user: action.payload,
        };
        case CLEAR_ERROR:
          return {
            ...state,
            error:null
          };
          case SET_ERROR:
            return {
              ...state,
              error: action.payload
            };
            case USER_LOADING:
              return {
                ...state,
                loading: true
              };

    default: return state
  }
}

export default Reducer
