import {
  TAG_ACTION_LOADING, CREATE_TAG, ERROR_TAG, GET_TAGS, DELETE_TAG, UPDATE_TAG, SUCCESS_FALSE, CLEAR_ERROR,FILTER_TAG
} from './tagTypes'


const initialState = {
  tags: [],
  tags_id: [],
  delete_success_tag: null,
  page_tag: null,
  success: null,
  error: null,
  action_loading:false
};

const Reducer = (state = initialState, action) => {


  switch (action.type) {

    case CREATE_TAG:
      return {
        ...state,
        tags: [action.payload.tag_uuid, ...state.tags],
        success: true,
        error: null,
        message: "Tag Created",
        tags_id: [action.payload, ...state.tags_id],
        action_loading:false
      }
    case GET_TAGS:
      return {
        ...state,
        tags_id: action.payload.results,
        page_tag: action.payload.page,
      }
    case DELETE_TAG:
      return {
        ...state,
        tags_id: [...state.tags_id.filter(tag => tag.tag_uuid !== action.payload)],
        delete_success_tag: true,
        success: true,
        error: null,
        message: "Tag Removed"
      };
    case UPDATE_TAG:
      return {
        ...state,
        tags_id: state.tags_id.map(tag =>
          tag.tag_uuid === action.payload.tag_uuid ? action.payload : tag,
        ),
        success: true,
        error: null,
        message: "Tag Updated",
        action_loading:false
      };
    case ERROR_TAG:
      return {
        ...state,
        error: action.payload,
        success: false,
        action_loading:false
      };
    case SUCCESS_FALSE:
      return {
        ...state,
        success: false
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case TAG_ACTION_LOADING:
      return {
        ...state,
        action_loading: action.payload
      };
      case FILTER_TAG:
        return {
          ...state,
          tags_id: action.payload.results,
          page_tag: action.payload.page,
        }

    default: return state
  }
}

export default Reducer
