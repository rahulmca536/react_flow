import {
    GET_CAMPAIGN,ERROR_CAMPAIGN,ADD_CAMPAIGN,UPDATE_CAMPAIGN,CREATE_EMAIL_CAMPAIGN,SET_CAMPAIGN_LOADING,SET_SUCCESS_CAMPAIGN,
    SELECT_ALL_TAG,DESELECT_ALL_TAG,SELECT_TAG,DESELECT_TAG,GET_BY_ID_CAMPAIGN,CLEAR_CURRENT_CAMPAIGN,SAVE_QUIT_ROUTE
  } from './campaignTypes'
  import axios from 'axios';

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  export const getCampaigns = () => {
      let limit = 10,page = 1,sortBy = 'campaign_name',order = 0;
    return (dispatch) => {
      const request=axios.get(
        `/api/v1/campaigns?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${order}`,
      );
      request.then(response=>{
        dispatch({type: GET_CAMPAIGN, payload: response.data});
    }) 
    request.catch ((err) =>{
      dispatch({type: ERROR_CAMPAIGN, payload: err.response.data.error.message});
    })

    }
  }

  export const createCampaign = (campaign,i) => {
  return (dispatch) => {
    dispatch({type: SET_CAMPAIGN_LOADING});
    const request=axios.post('/api/v1/campaign', {"campaign_name": campaign.campaign_name,"campaign_type":campaign.campaign_type}, config);
    request.then(response=>{
      dispatch({type: ADD_CAMPAIGN, payload: response.data});

      const req=axios.put(`/api/v1/campaign/${response.data.campaign_uuid}`, {"from_name": campaign.user_name,"reply_to":campaign.reply_to}, config);
      req.then(res=>{
        dispatch({type: UPDATE_CAMPAIGN, payload: res.data});
        const mes_req =axios.post('/api/v1/message', {campaign_id:response.data.campaign_uuid,messageTemplate:{subject:campaign.subject}}, config);
        mes_req.then(mes_res=>{
          dispatch({type: CREATE_EMAIL_CAMPAIGN, payload: mes_res.data});
          dispatch({type: SAVE_QUIT_ROUTE, payload: i});

      }) 
      request.catch ((errrr) =>{
        dispatch({type: ERROR_CAMPAIGN, payload: errrr.response.data.error.message});
      })
    }) 
    req.catch ((errr) =>{
      dispatch({type: ERROR_CAMPAIGN, payload: errr.response.data.error.message});
    })

  }) 
  request.catch ((err) =>{
    dispatch({type: ERROR_CAMPAIGN, payload: err.response.data.error.message});
  })

  }
}




export const getCampaignbyid = (id) => {
  
return (dispatch) => {
  const request=axios.get(`/api/v1/campaign/${id}`);
  request.then(response=>{
    dispatch({type: GET_BY_ID_CAMPAIGN, payload: response.data});
}) 
request.catch ((err) =>{
  dispatch({type: ERROR_CAMPAIGN, payload: err.response.data.error.message});
})

}
}

export const set_success_campaign = () => {
  return (dispatch) => {
    dispatch({type: SET_SUCCESS_CAMPAIGN});
  }
}
export const set_save_quit_route = () => {
  return (dispatch) => {
    dispatch({type: SAVE_QUIT_ROUTE, payload: false});
  }
}

export const clear_current_campaign = () => {
  return (dispatch) => {
    dispatch({type: CLEAR_CURRENT_CAMPAIGN});
  }
}





export const selectAlltags =  data => { 
  return (dispatch) => {
    dispatch({type: SELECT_ALL_TAG, payload: data});
}
}


export const deselectAlltags =  data => { 
return (dispatch) => {
  dispatch({type: DESELECT_ALL_TAG});
}

};

export const selecttag =  data => { 
  return (dispatch) => {
    dispatch({type: SELECT_TAG, payload: data});
}

  };
  export const deselecttag =  data => { 
    return (dispatch) => {
      dispatch({type: DESELECT_TAG, payload: data});
  }
  
    };