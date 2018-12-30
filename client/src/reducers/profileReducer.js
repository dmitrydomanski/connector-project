import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
} from '../actions/types';

const defaultState = {
    devProfile: null,
    profiles: null,
    loading: false,
};

/* eslint indent: 0 */
const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                devProfile: action.payload,
                loading: false,
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false,
            };
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true,
            };
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                devProfile: null,
            };
        default:
            return state;
    }
};

export default profileReducer;
