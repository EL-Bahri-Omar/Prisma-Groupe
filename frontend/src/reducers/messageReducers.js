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
    UPDATE_MESSAGE_RESET,
    DELETE_MESSAGE_RESET,
    CLEAR_ERRORS
} from '../constants/messageConstants';

// Reducer for creating a new message
export const newMessageReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CREATE_MESSAGE_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            };
        case CREATE_MESSAGE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

// Reducer for user's messages
export const myMessagesReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case MY_MESSAGES_REQUEST:
            return {
                loading: true
            };
        case MY_MESSAGES_SUCCESS:
            return {
                loading: false,
                messages: action.payload.messages
            };
        case MY_MESSAGES_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

// Reducer for message details
export const messageDetailsReducer = (state = { message: {} }, action) => {
    switch (action.type) {
        case MESSAGE_DETAILS_REQUEST:
            return {
                loading: true
            };
        case MESSAGE_DETAILS_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            };
        case MESSAGE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

// Reducer for all messages (Admin)
export const allMessagesReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case ALL_MESSAGES_REQUEST:
            return {
                loading: true
            };
        case ALL_MESSAGES_SUCCESS:
            return {
                loading: false,
                messages: action.payload.messages
            };
        case ALL_MESSAGES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

// Reducer for message operations (Admin)
export const messageReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_MESSAGE_REQUEST:
        case DELETE_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            };
        case DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            };
        case UPDATE_MESSAGE_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case DELETE_MESSAGE_RESET:
            return {
                ...state,
                isDeleted: false
            };
        case UPDATE_MESSAGE_FAIL:
        case DELETE_MESSAGE_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};