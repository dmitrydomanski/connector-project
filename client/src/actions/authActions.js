/* eslint camelcase: 0 */
import jwt_decode from 'jwt-decode';
import client from './index';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => (dispatch) => {
    client.post('users/register', userData)
        .then(res => history.push('/login'))
        .catch((err) => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            }
        });
};

/* eslint arrow-body-style: */
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

export const loginUser = userData => (dispatch) => {
    client.post('users/login', userData)
        .then((res) => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch((err) => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            }
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentUser({
    }));
};
