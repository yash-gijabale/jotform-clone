import { ALL_FORM_FAIL, ALL_FORM_REQUEST, ALL_FORM_SUCCESS, NEW_FORM_FAIL, NEW_FORM_REQUEST, NEW_FORM_SUCCESS } from '../constant/formConstant.js'


export const formReducer = (state = { loading: false, forms: [] }, action) => {
    switch (action.type) {
        case ALL_FORM_REQUEST:
            return {
                loading: true,
                forms: []
            }

        case ALL_FORM_SUCCESS:
            return {
                loading: false,
                forms: action.payload.data
            }
        case ALL_FORM_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const addForm = (state = {}, action) => {
    switch (action.type) {

        case NEW_FORM_REQUEST:
            return {
                loading: true,
                form: {}
            }

        case NEW_FORM_SUCCESS:
            return {
                loading: false,
                form: action.payload.data
            }
        case NEW_FORM_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}