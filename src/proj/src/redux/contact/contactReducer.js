import {
  CONTACT_ACTION_LOADING, CONTACT_LOADING, ASSIGN_TAG_SUCCESS, SUCCESS_FALSE, CLEAR_ERROR, FILTER_CONTACT, CONTACT_BULK_DELETE, GET_BY_ID_CONTACT, UPDATE_CONTACT, GET_CONTACT, ERROR_CONTACT, DELETE_CONTACT, ADD_CONTACT, SELECT_ALL_CONTACT, DESELECT_ALL_CONTACT, SELECT_CONTACT, DESELECT_CONTACT
} from './contactTypes'


const initialState = {
  contacts: [],
  selected_contacts: [],
  page_contact: null,
  success: false,
  current_contact: null,
  error: null,
  message: null,
  loading: false,
  action_loading: false

};

const Reducer = (state = initialState, action) => {


  switch (action.type) {

    case GET_CONTACT:
      return {
        ...state,
        contacts: action.payload.results,
        page_contact: action.payload.page,
        error: null,
        loading: false
      }
    case ERROR_CONTACT:
      return {
        ...state,
        error: action.payload,
        action_loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: [
          ...state.contacts.filter(
            contact => contact.contact_uuid !== action.payload,
          ),
        ],
        error: null,
        success: true,
        message: "Contact Removed",
        action_loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        success: true,
        error: null,
        message: "Added succesfully",
        action_loading: false

      };
    case SELECT_ALL_CONTACT:
      return {
        ...state,
        selected_contacts: state.contacts.map(contact => contact.contact_uuid),
        error: null
      };
    case DESELECT_ALL_CONTACT:
      return {
        ...state,
        selected_contacts: [],
        error: null
      }
    case SELECT_CONTACT:
      return {
        ...state,
        selected_contacts: [...state.selected_contacts, action.payload],
      }
    case DESELECT_CONTACT:
      return {
        ...state,
        selected_contacts: state.selected_contacts.filter(
          contact_uuid => contact_uuid != action.payload),
        error: null
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.contact_uuid === action.payload.contact_uuid
            ? action.payload
            : contact,
        ),
        success: true,
        error: null,
        message: "Updated succesfully",
        action_loading: false

      };
    case GET_BY_ID_CONTACT:
      return {
        ...state,
        current_contact: action.payload,
        error: null
      };
    case CONTACT_BULK_DELETE:
      return {
        ...state,
        contacts: state.contacts.filter(contact => {
          let flag = false;
          state.selected_contacts.map(deleted_contacts => {
            if (contact.contact_uuid == deleted_contacts) flag = true;
          });
          if (flag) return false;
          else return true;
        }),
        selected_contacts: [],
        success: true,
        message: action.payload,
        error: null,
        action_loading: false
      };
    case FILTER_CONTACT:
      return {
        ...state,
        contacts: action.payload.results,
        page_contact: action.payload.page,
        error: null,
        action_loading: false
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case SUCCESS_FALSE:
      return {
        ...state,
        success: false
      };
    case ASSIGN_TAG_SUCCESS:
      return {
        ...state,
        message: action.payload,
        success: true,
        error: null,
        action_loading: false
      }
    case CONTACT_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case CONTACT_ACTION_LOADING:
      return {
        ...state,
        action_loading: action.payload
      };

    default: return state
  }
}

export default Reducer
