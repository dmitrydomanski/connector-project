import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const defaultState = {
    isAuthenticated: false,
    user: {
    },
};

/* eslint indent: 0 */
const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
