import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profileReducer from './profileReducer';

const reducers = {
    auth: authReducer,
    err: errorsReducer,
    profile: profileReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
