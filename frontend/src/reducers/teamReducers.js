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
    NEW_TEAM_RESET,
    DELETE_TEAM_REQUEST,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_RESET,
    DELETE_TEAM_FAIL,
    UPDATE_TEAM_REQUEST,
    UPDATE_TEAM_SUCCESS,
    UPDATE_TEAM_RESET,
    UPDATE_TEAM_FAIL,
    CLEAR_ERRORS
} from '../constants/teamConstants';

// Reducer for all team members (public and admin)
export const teamMembersReducer = (state = { team: [] }, action) => {
    switch (action.type) {
        case ALL_TEAM_REQUEST:
        case ADMIN_TEAM_REQUEST:
            return {
                loading: true,
                team: []
            };
        case ALL_TEAM_SUCCESS:
            return {
                loading: false,
                team: action.payload.teamMembers,
                count: action.payload.count
            };
        case ADMIN_TEAM_SUCCESS:
            return {
                loading: false,
                team: action.payload.teamMembers
            };
        case ALL_TEAM_FAIL:
        case ADMIN_TEAM_FAIL:
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

// Reducer for single team member details
export const teamMemberDetailsReducer = (state = { member: {} }, action) => {
    switch (action.type) {
        case TEAM_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case TEAM_DETAILS_SUCCESS:
            return {
                loading: false,
                member: action.payload.teamMember
            };
        case TEAM_DETAILS_FAIL:
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

// Reducer for new team member creation
export const newTeamMemberReducer = (state = { member: {} }, action) => {
    switch (action.type) {
        case NEW_TEAM_REQUEST:
            return {
                ...state,
                loading: true
            };
        case NEW_TEAM_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                member: action.payload.teamMember
            };
        case NEW_TEAM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case NEW_TEAM_RESET:
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

// Reducer for team member operations (update and delete)
export const teamMemberReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_TEAM_REQUEST:
        case UPDATE_TEAM_REQUEST:
            return {
                ...state,
                loading: true
            };
        case DELETE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            };
        case UPDATE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            };
        case DELETE_TEAM_FAIL:
        case UPDATE_TEAM_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case DELETE_TEAM_RESET:
            return {
                ...state,
                isDeleted: false
            };
        case UPDATE_TEAM_RESET:
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