import * as actionTypes from './actions';
import config from '../config';

export const initialState = {
    authed : false, //for active default menu
    
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                authed: true,
            };

        case actionTypes.LOGOUT:
                return {
                    ...state,
                    authed: false,
                };
         
        default:
            return state;
    }
};

export default authenticationReducer;
