import {
    CSV_SUCCESS, CSV_ERROR, CSV_SAMPLE_DATA,SET_ATTRIBUTE,CSV_EMAIL_COL,CSV_MAPPED,CSV_LOADING
} from './csvTypes'


const initialState = {
    loading: false,
    loading_flag: false,
    success: false,
    action_uuid: null,
    sampleData:null,
    attributes:null,
    emailCol:null,
    mapbutton:true,
    mapped:false,
    error:null

};

const Reducer = (state = initialState, action) => {


    switch (action.type) {

        case CSV_SUCCESS:
            return {
                ...state,
                loading: false,
                loading_flag: false,
                success: true,
                error:false,
                action_uuid: action.payload.action_uuid,
            }
        case CSV_ERROR:
            return {
                ...state,
                loading: false,
                loading_flag: false,
                error: action.payload,
            };
        case CSV_SAMPLE_DATA:
            return {
                ...state,
                sampleData: action.payload.sampleData,
                attributes: action.payload.attributes,
                mapbutton:false
            };
            case SET_ATTRIBUTE:
                return {
                  ...state,
                  attributes: action.payload,
                };
                case CSV_EMAIL_COL:
                    return {
                      ...state,
                      emailCol: action.payload.emailCol,
                      attributes: action.payload.attributes
                    };
                    case CSV_MAPPED:
                        return {
                          ...state,
                          mapped:true,
                          loading:false
                        };
                        case CSV_LOADING:
                            return {
                              ...state,
                              loading:true
                            };

        default: return state
    }
}

export default Reducer
