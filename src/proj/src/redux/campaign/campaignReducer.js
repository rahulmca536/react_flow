import {
    GET_CAMPAIGN,ERROR_CAMPAIGN,ADD_CAMPAIGN,UPDATE_CAMPAIGN,CREATE_EMAIL_CAMPAIGN,SET_CAMPAIGN_LOADING,SET_SUCCESS_CAMPAIGN,
    SELECT_ALL_TAG,DESELECT_ALL_TAG,SELECT_TAG,DESELECT_TAG,GET_BY_ID_CAMPAIGN,CLEAR_CURRENT_CAMPAIGN,SAVE_QUIT_ROUTE
  } from './campaignTypes'
  
  
  const initialState = {
    campaigns:[],
    page_campaign: null,
    loading: false,
    error:null,
    current_campaign:null,
    campaign_email:[],
    current_campaign_email:null,
    success_campaign:false,
    selected_tags:[],
    save_quit_route: false
  };
  
  const Reducer = (state = initialState, action) => {
  
  
    switch (action.type) {
  
      case GET_CAMPAIGN:
        return {
          ...state,
          campaigns: action.payload.results,
          page_campaign: action.payload.page,
          loading: false,
        }
        case ERROR_CAMPAIGN:
            return {
              ...state,
              error: action.payload,
              loading: false,
            };
            case ADD_CAMPAIGN:
              return {
                ...state,
                campaigns: [action.payload, ...state.campaigns],
                current_campaign: action.payload,
              };
              case UPDATE_CAMPAIGN:
                return {
                  ...state,
                  campaigns: state.campaigns.map(campaign =>
                    campaign.campaign_uuid === action.payload.campaign_uuid
                      ? action.payload
                      : campaign,
                  ),
                };
                case CREATE_EMAIL_CAMPAIGN:
                  return {
                    ...state,
                    campaign_email: [action.payload, ...state.campaign_email],
                    current_campaign_email: action.payload,
                    loading: false,
                    success_campaign:true
                  };
                  case SET_CAMPAIGN_LOADING:
                    return {
                      ...state,
                      loading: true,
                    };
                    case SET_SUCCESS_CAMPAIGN:
                      return {
                        ...state,
                        success_campaign: false,
                      };
                      case GET_BY_ID_CAMPAIGN:
                        return {
                          ...state,
                          current_campaign: action.payload,
                        };


                      case SELECT_ALL_TAG:
                        return {
                          ...state,
                          selected_tags: action.payload,
                          error: null
                        };
                      case DESELECT_ALL_TAG:
                        return {
                          ...state,
                          selected_tags: [],
                          error: null
                        }
                      case SELECT_TAG:
                        return {
                          ...state,
                          selected_tags: [...state.selected_tags, action.payload],
                        }
                      case DESELECT_TAG:
                        return {
                          ...state,
                          selected_tags: state.selected_tags.filter(
                            contact_uuid => contact_uuid.tag_uuid != action.payload),
                          error: null
                        }
                        case CLEAR_CURRENT_CAMPAIGN:
                          return{
                            ...state,
                            current_campaign:null,
                            current_campaign_email:null,
                            selected_tags:[]
                          }
                          case SAVE_QUIT_ROUTE:
                            return{
                              ...state,
                              save_quit_route: action.payload
                            }
  
      default: return state
    }
  }
  
  export default Reducer
  