import { GET_ERRORS } from '../actions/types';

const defaultState = {
};

/* eslint indent: 0 */
const errorsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
};

export default errorsReducer;
