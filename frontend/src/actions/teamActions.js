import axios from 'axios';
import {
    ALL_TEAM_REQUEST,
    ALL_TEAM_SUCCESS,
    ALL_TEAM_FAIL,
    ADMIN_TEAM_REQUEST,
    ADMIN_TEAM_SUCCESS,
    ADMIN_TEAM_FAIL,
    TEAM_DETAILS_REQUEST,
    TEAM_DETAILS_SUCCESS,
    TEAM_DETAILS_FAIL,
    NEW_TEAM_REQUEST,
    NEW_TEAM_SUCCESS,
    NEW_TEAM_FAIL,
    DELETE_TEAM_REQUEST,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FAIL,
    UPDATE_TEAM_REQUEST,
    UPDATE_TEAM_SUCCESS,
    UPDATE_TEAM_FAIL,
    CLEAR_ERRORS
} from '../constants/teamConstants';

// Get all team members (public)
export const getTeamMembers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_TEAM_REQUEST });
        
        const { data } = await axios.get('/api/v1/team');
        
        dispatch({
            type: ALL_TEAM_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ALL_TEAM_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get all team members (admin)
export const getAdminTeamMembers = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_TEAM_REQUEST });
        
        const { data } = await axios.get('/api/v1/admin/team');
        
        dispatch({
            type: ADMIN_TEAM_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_TEAM_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get team member details
export const getTeamMemberDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: TEAM_DETAILS_REQUEST });
        
        const { data } = await axios.get(`/api/v1/team/${id}`);
        
        dispatch({
            type: TEAM_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: TEAM_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
};

// Create new team member (admin)
export const newTeamMember = (memberData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_TEAM_REQUEST });
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const { data } = await axios.post('/api/v1/admin/team/new', memberData, config);
        
        dispatch({
            type: NEW_TEAM_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: NEW_TEAM_FAIL,
            payload: error.response.data.message
        });
    }
};

// Update team member (admin)
export const updateTeamMember = (id, memberData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TEAM_REQUEST });
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const { data } = await axios.put(`/api/v1/admin/team/${id}`, memberData, config);
        
        dispatch({
            type: UPDATE_TEAM_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_TEAM_FAIL,
            payload: error.response.data.message
        });
    }
};

// Delete team member (admin)
export const deleteTeamMember = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TEAM_REQUEST });
        
        const { data } = await axios.delete(`/api/v1/admin/team/${id}`);
        
        dispatch({
            type: DELETE_TEAM_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_TEAM_FAIL,
            payload: error.response.data.message
        });
    }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};