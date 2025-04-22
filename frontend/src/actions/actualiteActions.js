import axios from 'axios';
import {
    ALL_ACTUALITES_REQUEST,
    ALL_ACTUALITES_SUCCESS,
    ALL_ACTUALITES_FAIL,
    ADMIN_ACTUALITES_REQUEST,
    ADMIN_ACTUALITES_SUCCESS,
    ADMIN_ACTUALITES_FAIL,
    ACTUALITE_DETAILS_REQUEST,
    ACTUALITE_DETAILS_SUCCESS,
    ACTUALITE_DETAILS_FAIL,
    NEW_ACTUALITE_REQUEST,
    NEW_ACTUALITE_SUCCESS,
    NEW_ACTUALITE_FAIL,
    DELETE_ACTUALITE_REQUEST,
    DELETE_ACTUALITE_SUCCESS,
    DELETE_ACTUALITE_FAIL,
    UPDATE_ACTUALITE_REQUEST,
    UPDATE_ACTUALITE_SUCCESS,
    UPDATE_ACTUALITE_FAIL,
    CLEAR_ERRORS
} from '../constants/actualiteConstants';

// Get all actualites (public)
export const getActualites = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: ALL_ACTUALITES_REQUEST });
        
        let link = `/api/v1/actualites`;
        if (keyword) {
            link += `?keyword=${keyword}`;
        }
        
        const { data } = await axios.get(link);
        
        dispatch({
            type: ALL_ACTUALITES_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ALL_ACTUALITES_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get all actualites (admin)
export const getAdminActualites = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ACTUALITES_REQUEST });
        
        const { data } = await axios.get('/api/v1/admin/actualites');
        
        dispatch({
            type: ADMIN_ACTUALITES_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_ACTUALITES_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get actualite details
export const getActualiteDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ACTUALITE_DETAILS_REQUEST });
        
        const { data } = await axios.get(`/api/v1/actualite/${id}`);
        
        dispatch({
            type: ACTUALITE_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ACTUALITE_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
};

// Create new actualite (admin)
export const newActualite = (actualiteData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_ACTUALITE_REQUEST });
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const { data } = await axios.post('/api/v1/admin/actualite/new', actualiteData, config);
        
        dispatch({
            type: NEW_ACTUALITE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: NEW_ACTUALITE_FAIL,
            payload: error.response.data.message
        });
    }
};

// Update actualite (admin)
export const updateActualite = (id, actualiteData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ACTUALITE_REQUEST });
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const { data } = await axios.put(`/api/v1/admin/actualite/${id}`, actualiteData, config);
        
        dispatch({
            type: UPDATE_ACTUALITE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_ACTUALITE_FAIL,
            payload: error.response.data.message
        });
    }
};

// Delete actualite (admin)
export const deleteActualite = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ACTUALITE_REQUEST });
        
        const { data } = await axios.delete(`/api/v1/admin/actualite/${id}`);
        
        dispatch({
            type: DELETE_ACTUALITE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_ACTUALITE_FAIL,
            payload: error.response.data.message
        });
    }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
