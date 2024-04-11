import {
    ALL_FORM_FAIL, ALL_FORM_REQUEST,
    ALL_FORM_SUCCESS, NEW_FORM_FAIL, NEW_FORM_REQUEST, NEW_FORM_SUCCESS,
    LABALE_CHANGE,
    CHANGE_INPUT_PLACEHOLDER,
    CHANGE_CHECKBOX_LABLE,
    CHANGE_CHECKBOX_REQUIRED,
    CHANGE_CHECKBOX_TITLE,
    SET_PREVIOUS_FORM
} from '../constant/formConstant.js'


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


export const inputElementReducer = (state = {}, action) => {
    // let id = action.payload.id
    let data = { ...state }
    switch (action.type) {
        case LABALE_CHANGE:
            data[action.payload.id] = { ...data[action.payload.id], lable: action.payload.lable, type: action.payload.type }
            return data

        case CHANGE_INPUT_PLACEHOLDER:
            data[action.payload.id] = { ...data[action.payload.id], placeholder: action.payload.placeholder, type: action.payload.type }
            return data

        case CHANGE_CHECKBOX_LABLE:
            data[action.payload.id] = { ...data[action.payload.id], lable: action.payload.lable, type: action.payload.type }
            return data

        case CHANGE_CHECKBOX_REQUIRED:
            data[action.payload.id] = { ...data[action.payload.id], isRequired: action.payload.isRequired, type: action.payload.type }
            return data

        case CHANGE_CHECKBOX_TITLE:
            data[action.payload.id] = { ...data[action.payload.id], title: action.payload.title, type: action.payload.type }
            return data

        case SET_PREVIOUS_FORM:
            return state = action.payload

        default:
            return state
    }
}

export const checkboxElementReducer = (state = {}, action) => {
    let data = { ...state }

    console.log(state)
    switch (action.type) {
        case CHANGE_CHECKBOX_LABLE:
            data[action.payload.id] = { ...data[action.payload.id], lable: action.payload.lable, type: action.payload.type }
            return data

        case CHANGE_CHECKBOX_REQUIRED:
            data[action.payload.id] = { ...data[action.payload.id], isRequired: action.payload.isRequired, type: action.payload.type }
            return data

        case CHANGE_CHECKBOX_TITLE:
            data[action.payload.id] = { ...data[action.payload.id], title: action.payload.title, type: action.payload.type }
            return data

        default:
            return state
    }

}