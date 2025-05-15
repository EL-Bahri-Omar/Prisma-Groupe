import axios from 'axios';
import {
    CREATE_MESSAGE_REQUEST,
    CREATE_MESSAGE_SUCCESS,
    CREATE_MESSAGE_FAIL,
    MY_MESSAGES_REQUEST,
    MY_MESSAGES_SUCCESS,
    MY_MESSAGES_FAIL,
    ALL_MESSAGES_REQUEST,
    ALL_MESSAGES_SUCCESS,
    ALL_MESSAGES_FAIL,
    UPDATE_MESSAGE_REQUEST,
    UPDATE_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_FAIL,
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_FAIL,
    MESSAGE_DETAILS_REQUEST,
    MESSAGE_DETAILS_SUCCESS,
    MESSAGE_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/messageConstants';

// Create new message
export const createMessage = (messageData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_MESSAGE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post('/api/v1/message/new', messageData, config);

        dispatch({
            type: CREATE_MESSAGE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CREATE_MESSAGE_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get logged-in user's messages
export const getMyMessages = () => async (dispatch) => {
    try {
        dispatch({ type: MY_MESSAGES_REQUEST });

        const { data } = await axios.get('/api/v1/messages/me');

        dispatch({
            type: MY_MESSAGES_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: MY_MESSAGES_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get message details
export const getMessageDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: MESSAGE_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/message/${id}`);

        dispatch({
            type: MESSAGE_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: MESSAGE_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get all messages (Admin)
export const getAllMessages = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_MESSAGES_REQUEST });

        const { data } = await axios.get('/api/v1/admin/messages');

        dispatch({
            type: ALL_MESSAGES_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ALL_MESSAGES_FAIL,
            payload: error.response?.data?.message
        });
    }
};

// Update message (Admin reply)
export const updateMessage = (id, adminReply) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_MESSAGE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.put(
            `/api/v1/admin/message/${id}`,
            { adminReply },
            config
        );

        dispatch({
            type: UPDATE_MESSAGE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_MESSAGE_FAIL,
            payload: error.response.data.message
        });
    }
};

// Delete message (Admin)
export const deleteMessage = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_MESSAGE_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/message/${id}`);

        dispatch({
            type: DELETE_MESSAGE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_MESSAGE_FAIL,
            payload: error.response.data.message
        });
    }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};