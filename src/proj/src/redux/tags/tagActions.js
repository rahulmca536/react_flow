import {
  FILTER_TAG,CREATE_TAG,ERROR_TAG,GET_TAGS,DELETE_TAG,UPDATE_TAG,SUCCESS_FALSE,CLEAR_ERROR,TAG_ACTION_LOADING
  } from './tagTypes'
  import axios from 'axios';

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };


  export const createTag = tag => {
    return (dispatch) => {
      dispatch({type: TAG_ACTION_LOADING,payload:true});
      const request=axios.post('/api/v1/tag', tag, config)
      request.then(response=>{
        dispatch({type: CREATE_TAG, payload: response.data});
    })
    request.catch ((err) =>{
      dispatch({type: ERROR_TAG, payload: err.response.data.error.message});
    })
    }
  }
  export const gettags = (data) => {
    return (dispatch) => {
      const request=axios.get(`/api/v1/tag?page=${data.page}&limit=${data.limit}&sortBy=${data.sortBy}&orderBy=${data.orderBy}`)
      request.then(response=>{
        dispatch({type: GET_TAGS, payload: response.data});
    }) 
    request.catch ((err) =>{
      dispatch({type: ERROR_TAG, payload: err.response.data.error.message});
    })

    }
  }


  
  export const deleteTag =  id => { 
    return (dispatch) => {
      const request=axios.delete(`/api/v1/tag/${id}`)
      request.then(response=>{
        dispatch({type: DELETE_TAG, payload: id});
        })
        request.catch ((err) =>{
          dispatch({type: ERROR_TAG, payload: err.response.data.error.message});
        })
}

  };


  export const updateTag =  (uuid,tag) => { 
    return (dispatch) => {
      dispatch({type: TAG_ACTION_LOADING,payload:true});
      const request=axios.put(`/api/v1/tag/${uuid}`, tag, config)
      request.then(response=>{
        dispatch({type: UPDATE_TAG, payload: response.data});
        })
        request.catch ((err) =>{
          dispatch({type: ERROR_TAG, payload: err.response.data.error.message});
        })
}

  };
  export const success_false = () => {
    return (dispatch) => {
      dispatch({type: SUCCESS_FALSE});
    }
  }

  export const clear_error = () => {
    return (dispatch) => {
      dispatch({type: CLEAR_ERROR});
    }
  }

  export const filterTag =  (value) => { 
    let page=1,limit=25;
    return (dispatch) => {
      const request=axios.get(
        `/api/v1/tag/search/${value}?page=${page}&limit=${limit}`,
      );
      request.then(response=>{
        dispatch({type: FILTER_TAG, payload: response.data});
        })
        request.catch ((err) =>{
          dispatch({type: ERROR_TAG, payload: err.response.data.error.message});
        })
}

  };

