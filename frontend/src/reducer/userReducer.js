import {
    USER_LOAD,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOAD_FALS,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOGOUT
} from "../constant/userConstant";

export const userReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_LOGIN_REQUEST:
        case USER_LOAD_REQUEST:
            return {
                loading: true,
                user: null
            }

        case USER_LOGIN_SUCCESS:
        case USER_LOAD_SUCCESS:
            console.log(action.payload)
            return {
                loading: true,
                user: action.payload
            }

        case USER_LOGOUT:
            return {
                loading: false,
                user: null
            }
        case USER_LOGIN_FAIL:
        case USER_LOAD_FALS:
            return {
                loading: false,
                user: null,
                error: action.payload
            }

        default:
            return {
                loading: false,
                user: null,
            }
    }
}