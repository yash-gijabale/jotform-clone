import { USER_LOAD, USER_LOAD_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constant/userConstant";
import axios from 'axios'

export const login = (userData) => async (dispatch) => {
    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const { data } = await axios.post('/api/v1/user/login', userData, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.user
        })

        // console.log(data)

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.error
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const { data } = await axios.get('/api/v1/user/profile')

        console.log(data)

        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.error
        })

    }
}

export const logoutUser = () => async (dispatch) => {
    const { data } = await axios.get('/api/v1/user/logout')
    dispatch({
        type: USER_LOGOUT,
    })
}