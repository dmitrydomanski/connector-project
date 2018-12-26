/* eslint camelcase: 0 */
/* eslint arrow-body-style: */
/* eslint no-unused-vars: */

import client from './index';
import {
    GET_ERRORS,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    SET_CURRENT_USER,
    CLEAR_CURRENT_PROFILE,
    // ADD_EXPERIENCE,
    // DELETE_ACCOUNT,
    // PROFILE_NOT_FOUND,
} from './types';

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING,
    };
};

export const createProfile = (profileData, history) => (dispatch) => {
    client.post('/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
};

export const getCurrentProfile = () => (dispatch) => {
    dispatch(setProfileLoading());
    client.get('/profile')
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: {
            },
        }));
};

export const getProfiles = () => (dispatch) => {
    dispatch(setProfileLoading());
    client.get('/profile/all')
        .then(res => dispatch({
            type: GET_PROFILES,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_PROFILES,
            payload: null,
        }));
};

export const getProfileByHandle = handle => (dispatch) => {
    dispatch(setProfileLoading());
    client.get(`/profile/handle/${handle}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: null,
        }));
};

/* eslint no-alert: */
export const deleteAccount = () => (dispatch) => {
    if (window.confirm('Are you sure? This can not be undone!')) {
        client
            .delete('/profile')
            .then(res => dispatch({
                type: SET_CURRENT_USER,
                payload: {
                },
            }))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }));
    }
};

export const addExperience = (expData, history) => (dispatch) => {
    client.post('/profile/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
};

export const addEducation = (educationData, history) => (dispatch) => {
    client.post('/profile/education', educationData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
};

export const deleteExperience = id => (dispatch) => {
    client.delete(`/profile/experience/${id}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
};

export const deleteEducation = id => (dispatch) => {
    client.delete(`/profile/education/${id}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
};

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE,
    };
};
