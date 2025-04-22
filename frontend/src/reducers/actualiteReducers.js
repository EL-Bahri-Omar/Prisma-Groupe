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
    NEW_ACTUALITE_RESET,
    DELETE_ACTUALITE_REQUEST,
    DELETE_ACTUALITE_SUCCESS,
    DELETE_ACTUALITE_RESET,
    DELETE_ACTUALITE_FAIL,
    UPDATE_ACTUALITE_REQUEST,
    UPDATE_ACTUALITE_SUCCESS,
    UPDATE_ACTUALITE_RESET,
    UPDATE_ACTUALITE_FAIL,
    CLEAR_ERRORS
} from '../constants/actualiteConstants';

// Reducer for all actualites (public and admin)
export const actualitesReducer = (state = { actualites: [] }, action) => {
    switch (action.type) {
        case ALL_ACTUALITES_REQUEST:
        case ADMIN_ACTUALITES_REQUEST:
            return {
                loading: true,
                actualites: []
            };
        case ALL_ACTUALITES_SUCCESS:
            return {
                loading: false,
                actualites: action.payload.actualites,
                count: action.payload.count
            };
        case ADMIN_ACTUALITES_SUCCESS:
            return {
                loading: false,
                actualites: action.payload.actualites
            };
        case ALL_ACTUALITES_FAIL:
        case ADMIN_ACTUALITES_FAIL:
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

// Reducer for single actualite details
export const actualiteDetailsReducer = (state = { actualite: {} }, action) => {
    switch (action.type) {
        case ACTUALITE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ACTUALITE_DETAILS_SUCCESS:
            return {
                loading: false,
                actualite: action.payload.actualite
            };
        case ACTUALITE_DETAILS_FAIL:
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

// Reducer for new actualite creation
export const newActualiteReducer = (state = { actualite: {} }, action) => {
    switch (action.type) {
        case NEW_ACTUALITE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case NEW_ACTUALITE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                actualite: action.payload.actualite
            };
        case NEW_ACTUALITE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case NEW_ACTUALITE_RESET:
            return {
                ...state,
                success: false
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

// Reducer for actualite operations (update and delete)
export const actualiteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ACTUALITE_REQUEST:
        case UPDATE_ACTUALITE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case DELETE_ACTUALITE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            };
        case UPDATE_ACTUALITE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            };
        case DELETE_ACTUALITE_FAIL:
        case UPDATE_ACTUALITE_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case DELETE_ACTUALITE_RESET:
            return {
                ...state,
                isDeleted: false
            };
        case UPDATE_ACTUALITE_RESET:
            return {
                ...state,
                isUpdated: false
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