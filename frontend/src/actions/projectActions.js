import axios from 'axios';
import {
    ALL_PROJECTS_REQUEST,
    ALL_PROJECTS_SUCCESS,
    ALL_PROJECTS_FAIL,
    ADMIN_PROJECTS_REQUEST,
    ADMIN_PROJECTS_SUCCESS,
    ADMIN_PROJECTS_FAIL,
    NEW_PROJECT_REQUEST,
    NEW_PROJECT_SUCCESS,
    NEW_PROJECT_FAIL,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAIL,
    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAIL,
    PROJECT_DETAILS_REQUEST,
    PROJECT_DETAILS_SUCCESS,
    PROJECT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/projectConstants';

// Get all projects (public)
export const getProjects = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: ALL_PROJECTS_REQUEST });
        
        let link = `/api/v1/projects`;
        if (keyword) link += `?keyword=${keyword}`;
        
        const { data } = await axios.get(link);
        
        dispatch({
            type: ALL_PROJECTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ALL_PROJECTS_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get all projects (admin)
export const getAdminProjects = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PROJECTS_REQUEST });
        
        const { data } = await axios.get('/api/v1/admin/projects');
        
        dispatch({
            type: ADMIN_PROJECTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PROJECTS_FAIL,
            payload: error.response.data.message
        });
    }
};

// Create new project (admin)
export const newProject = (projectData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PROJECT_REQUEST });
        
        const { data } = await axios.post('/api/v1/admin/project/new', projectData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        dispatch({ type: NEW_PROJECT_SUCCESS, payload: data });
        
    } catch (error) {
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error ||
                            error.message;
        
        console.error('Project creation error:', {
            error: error.response?.data,
            config: error.config
        });
        
        dispatch({ 
            type: NEW_PROJECT_FAIL, 
            payload: errorMessage 
        });
    }
};

// Get project details
export const getProjectDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PROJECT_DETAILS_REQUEST });
        
        const { data } = await axios.get(`/api/v1/project/${id}`);
        
        dispatch({
            type: PROJECT_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: PROJECT_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
};

// Update project (admin)
export const updateProject = (id, projectData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROJECT_REQUEST });
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const { data } = await axios.put(`/api/v1/admin/project/${id}`, projectData, config);
        
        dispatch({
            type: UPDATE_PROJECT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PROJECT_FAIL,
            payload: error.response.data.message
        });
    }
};

// Delete project (admin)
export const deleteProject = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PROJECT_REQUEST });
        
        const { data } = await axios.delete(`/api/v1/admin/project/${id}`);
        
        dispatch({
            type: DELETE_PROJECT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_PROJECT_FAIL,
            payload: error.response.data.message
        });
    }
};

// Create review
export const createProjectReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const { data } = await axios.put('/api/v1/review', reviewData, config);
        
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get project reviews
export const getProjectReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_REVIEWS_REQUEST });
        
        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
        
        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        });
    }
};

// Delete review
export const deleteReview = (id, projectId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });
        
        const { data } = await axios.delete(`/api/v1/reviews?id=${id}&projectId=${projectId}`);
        
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        });
    }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};