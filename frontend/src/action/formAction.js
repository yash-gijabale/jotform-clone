import { ALL_FORM_FAIL, ALL_FORM_REQUEST, ALL_FORM_SUCCESS, NEW_FORM_FAIL, NEW_FORM_REQUEST, NEW_FORM_SUCCESS } from '../constant/formConstant.js'
import axios from 'axios'


export const getAllForms = () => async (dispatch) => {
    try {

        dispatch({
            type: ALL_FORM_REQUEST,
        })

        const { data } = await axios.get('/api/v1/form/all')
        // console.log(data)
        dispatch({
            type: ALL_FORM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_FORM_FAIL,
            payload: error.response.data.error
        })
    }
}

export const addForm = (fromData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_FORM_REQUEST
        })

        const {data} = await axios.post('/api/v1/form/new', fromData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(data)
        dispatch({
            type: NEW_FORM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_FORM_FAIL,
            payload: error.response.data.error
        })
    }
}