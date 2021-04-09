import {

  FETCH_USERS_SUCCESS,FETCH_ROUTE_ARRAY, TOGGLE_SHOW,TENANT_LOGIN_SUCCESS,CLEAR_ERROR,SET_ERROR,USER_LOADING,
  TENANT_SET_AUTH_LOADING,TENANT_LOGIN_FAIL,TENANT_REGISTER_SUCCESS,TENANT_AUTH_ERROR,TENANT_USER_LOADED,TENANT_REGISTER_FAIL,TENANT_LOGOUT
} from './userTypes'
import setAuthToken from '../../utils/setAuthToken';

import axios from 'axios';



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


// export const setLoading = () => dispatch({type: TENANT_SET_AUTH_LOADING});




export const setlogin = data  => {
console.log(data);
  return {
    type: TENANT_LOGIN_SUCCESS,
    payload: data
  }
}
export const setloginfail = data  => {
  console.log(data);
    return {
      type: TENANT_LOGIN_FAIL,
      payload: data
    }
  }
  export const setregisterfail = data  => {
    console.log(data);
      return {
        type: TENANT_REGISTER_FAIL,
        payload: data
      }
    }

  // export const register_user = (formData) => {
  //   return (dispatch) => {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     };

  //       axios.post('/api/v1/user/register', formData, config)
  //       .then(response=>{ 
  //         try{
  //           console.log(response.data);
  //           const users = response.data
  //           if(users.token){
  //             dispatch(setregister(users))
  //           }
  //         }
  //         catch(err){
  //           console.log();

  //           dispatch(setregisterfail(err.response.data.error.message))
  //         }

  //       })
      
  //   }
  // }

  export const setregister = data  => {
    console.log(data);
      return {
        type: TENANT_REGISTER_SUCCESS,
        payload: data
      }
    }



    export const loadUser =  () => { 
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      return (dispatch) => {
        const request =axios.get('/api/v1/user/profile')
        request.then(response=>{
          dispatch({type: TENANT_USER_LOADED, payload: response.data});
          })
          request.catch((err) => {
            dispatch({type: TENANT_AUTH_ERROR, payload:err.response.data.error.message})

      })
  }
  
    };

    export const logout =  () => { 

      return (dispatch) => {

        dispatch({type: TENANT_LOGOUT});
        

  }
  
    };


    export const register_user = (formData) => {
  return (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const request = axios.post('/api/v1/user/register', formData, config)
    request.then((response) => {
      console.log(response.data);
      const users = response.data
      if (users.token) {
        dispatch(setregister(users))
      }
    })
    request.catch((err) => {
      console.log(err.response.data.error.message);
      dispatch(setregisterfail(err.response.data.error.message))
})
}
    }

    export const login_user = (formData) => {
      return (dispatch) => {
    
    
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        
        const request= axios.post('/api/v1/user/login', formData, config)
        request.then((response)=>{ 
            console.log(response.data);
            const users = response.data
            if(users.token){
              dispatch(setlogin(users))
            }    
          })
          request.catch((err) => {
            console.log(err.response.data.error.message);
            dispatch(setloginfail(err.response.data.error.message))
      })

      }
    }

    export const clear_error = () => {
      return (dispatch) => {
        dispatch({type: CLEAR_ERROR});
      }
    }

    export const set_error = (data) => {
      console.log(data);
      return (dispatch) => {
        dispatch({type: SET_ERROR, payload:data});
      }
    }

    export const user_loading = () => {
      return (dispatch) => {
        dispatch({type: USER_LOADING});
      }
    }