import { combineReducers } from 'redux'
import addressReducer from "./address/addressSlice";

const rootReducer = combineReducers({
    address: addressReducer,
})

export default rootReducer