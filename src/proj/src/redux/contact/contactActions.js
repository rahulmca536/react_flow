import {

  CONTACT_ACTION_LOADING,CONTACT_LOADING,ASSIGN_TAG_SUCCESS,SUCCESS_FALSE,CLEAR_ERROR,FILTER_CONTACT,CONTACT_BULK_DELETE,UPDATE_CONTACT,GET_BY_ID_CONTACT,GET_CONTACT,ERROR_CONTACT,DELETE_CONTACT,ADD_CONTACT,SELECT_ALL_CONTACT,DESELECT_ALL_CONTACT,SELECT_CONTACT,DESELECT_CONTACT
  } from './contactTypes'
  import axios from 'axios';


  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };


  
  export const get_contact =  (data) => { 
    return (dispatch) => {
      dispatch({type: CONTACT_LOADING,payload:true});
      const request= axios.get(
        `/api/v1/contact?page=${data.page}&limit=${data.limit}&sortBy=${data.sortBy}&orderBy=${data.order}`)
        request.then(response=>{
          dispatch({type: GET_CONTACT, payload: response.data});
          })
    request.catch ((err) =>{
      dispatch({type: ERROR_CONTACT, payload: err.response.data.error.message});
    })
}

  };


  export const del_contact =  data => { 
    return (dispatch) => {
      const request=axios.delete(`/api/v1/contact/${data}`)
      request.then(response=>{
        dispatch({type: DELETE_CONTACT, payload: data});
        })
        request.catch ((err) =>{
          dispatch({type: ERROR_CONTACT, payload: err.response.data.error.message});
        })
}

  };

  export const createcontact =  data => { 
    return (dispatch) => {
      dispatch({type: CONTACT_ACTION_LOADING,payload:true});
      const request=axios.post('/api/v1/contact',data,config)
      request.then(response=>{
        dispatch({type: ADD_CONTACT, payload: response.data.contact});
        })
        request.catch ((err) =>{
          dispatch({type: ERROR_CONTACT, payload: err.response.data.error.message});
        })
}

  };

  export const selectAllContacts =  data => { 
    return (dispatch) => {
      dispatch({type: SELECT_ALL_CONTACT});
}
  }


export const deselectAllContacts =  data => { 
  return (dispatch) => {
    dispatch({type: DESELECT_ALL_CONTACT});
}

  };

  export const selectContact =  data => { 
    return (dispatch) => {
      dispatch({type: SELECT_CONTACT, payload: data});
  }
  
    };
    export const deselectContact =  data => { 
      return (dispatch) => {
        dispatch({type: DESELECT_CONTACT, payload: data});
    }
    
      };



      export const updateContact =  (contact_uuid,contact) => { 
        return (dispatch) => {
          dispatch({type: CONTACT_ACTION_LOADING,payload:true});
          const request=  axios.put(
            `/api/v1/contact/${contact_uuid}`,
            contact,
            config,
          )
          request.then(response=>{
            dispatch({type: UPDATE_CONTACT, payload: response.data.contact});
            })
            request.catch ((err) =>{
              dispatch({type: ERROR_CONTACT, payload: err.response.data.error.message});
            })
    }
    
      };
    

      export const getContactByid =  id => { 
        return (dispatch) => {
          const request= axios.get(`/api/v1/contact/${id}`)
          request.then(response=>{
            dispatch({type: GET_BY_ID_CONTACT, payload: response.data});
            })
            request.catch ((err) =>{
              dispatch({type: ERROR_CONTACT, payload: err.response.data.error.message});
            })
    }
    
      };


      export const contactBulkDelete =  data => { 
        return (dispatch) => {
          const request= axios.post(
            '/api/v1/contact/bulk/delete',
            {contact_ids: data},
            config,
          )
          request.then(response=>{
            dispatch({type: CONTACT_BULK_DELETE, payload:response.data.message});
            dispatch({type: DESELECT_ALL_CONTACT});
            })
            request.catch ((err) =>{
              dispatch({type: ERROR_CONTACT, payload: err.response.data.error.message});
            })
    }
    
      };



      export const addTagContact =  (tag_uuid,selected_contacts) => { 
        return (dispatch) => {
          dispatch({type: CONTACT_ACTION_LOADING,payload:true});
          const request= axios.post(
            '/api/v1/bulk/contact',
            {tag_uuid: tag_uuid, contact_ids: selected_contacts},
            config,
          )
          request.then(response=>{
            dispatch({type: ASSIGN_TAG_SUCCESS,payload:response.data.message});
            dispatch({type: DESELECT_ALL_CONTACT});
          })
          request.catch ((err) =>{
            dispatch({type: ERROR_CONTACT, payload: err.response.data.error.message});
          })
    }
    
      };



      export const filterContact =  value => { 
        let page = 1, limit = 25;
        return (dispatch) => {
          const request=          axios.get(
            `/api/v1/contact/search/${value}?page=${page}&limit=${limit}`,
          )
          request.then(response=>{
            dispatch({type: FILTER_CONTACT, payload: response.data});
            })
            request.catch ((err) =>{
              dispatch({type: ERROR_CONTACT, payload: err.response.data.error.message});
            })
    }
    
      };

      export const clear_error = () => {
        return (dispatch) => {
          dispatch({type: CLEAR_ERROR});
        }
      }
      export const success_false = () => {
        return (dispatch) => {
          dispatch({type: SUCCESS_FALSE});
        }
      }
      export const loading = (data) => {
        return (dispatch) => {
          dispatch({type: CONTACT_LOADING,payload:data});
        }
      }
      export const contact_action_loading = () => {
        return (dispatch) => {
          dispatch({type: CONTACT_ACTION_LOADING,payload:false});
        }
      }
