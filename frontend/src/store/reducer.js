import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import customizationReducer from './customizationReducer';

const reducer = combineReducers({
    customization: customizationReducer,
    authentication: authenticationReducer
});

export default reducer;
