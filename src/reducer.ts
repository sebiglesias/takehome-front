import { combineReducers } from 'redux'
import addressReducer from "./address/addressSlice";
import exchangeRatesReducer from "./exchangeRates/exchangeRatesSlice";

const rootReducer = combineReducers({
    address: addressReducer,
    exchangeRate: exchangeRatesReducer,
})

export default rootReducer