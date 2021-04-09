import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import csvuploadReducer from './csvupload/csvuploadReducer'
import tagReducer from './tags/tagReducer'
import contactReducer from './contact/contactReducer'
import campaignReducer from './campaign/campaignReducer'






const rootReducer = combineReducers({
  user: userReducer,
  csvupload: csvuploadReducer,
  tags: tagReducer,
  contact: contactReducer,
  campaign: campaignReducer



})

export default rootReducer
