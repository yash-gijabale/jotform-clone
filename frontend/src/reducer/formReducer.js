import {
    ALL_FORM_FAIL, ALL_FORM_REQUEST,
    ALL_FORM_SUCCESS, NEW_FORM_FAIL, NEW_FORM_REQUEST, NEW_FORM_SUCCESS,
    LABALE_CHANGE,
    CHANGE_INPUT_PLACEHOLDER,
    CHANGE_CHECKBOX_LABLE,
    CHANGE_CHECKBOX_REQUIRED,
    CHANGE_CHECKBOX_TITLE,
    SET_PREVIOUS_FORM,
    CHANGE_SELECT_LABLE,
    SET_SELECT_OPTION,
    CHANGE_DATE_LABLE,
    CHANGE_DATE_PLACEHOLDER,
    SET_DEFULT_MULTI_CHOISE_OPTION,
    SET_LABLE_CHOISE_OPTION,
    ADD_MORE_OPTION
} from '../constant/formConstant.js'


export const formReducer = (state = { loading: false, forms: [] }, action) => {
    switch (action.type) {
        case ALL_FORM_REQUEST:
            console.log('res')
            return {
                loading: true,
                forms: []
            }

        case ALL_FORM_SUCCESS:
            console.log('reso')
            return {
                loading: false,
                forms: action.payload
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

        case CHANGE_SELECT_LABLE:
            data[action.payload.id] = { ...data[action.payload.id], lable: action.payload.lable, type: action.payload.type }
            return data

        case SET_SELECT_OPTION:
            data[action.payload.id] = { ...data[action.payload.id], options: action.payload.options, type: action.payload.type }
            return data

        case CHANGE_DATE_LABLE:
            data[action.payload.id] = { ...data[action.payload.id], lable: action.payload.lable, type: action.payload.type }
            return data

        case CHANGE_DATE_LABLE:
            data[action.payload.id] = { ...data[action.payload.id], title: action.payload.title, type: action.payload.type }
            return data

        case CHANGE_DATE_PLACEHOLDER:
            data[action.payload.id] = { ...data[action.payload.id], placeholder: action.payload.placeholder, type: action.payload.type }
            return data

        case SET_DEFULT_MULTI_CHOISE_OPTION:
            data[action.payload.element.id] = { ...data[action.payload.element.id], defultProp: action.payload.defaultFiled, type: action.payload.element.element }
            return data

        case SET_LABLE_CHOISE_OPTION:
            let oldProps = data[action.payload.eleId].defultProp
            let updatedProps = oldProps.map(option => {
                if (option.id === action.payload.id) {
                    return { ...option, lable: action.payload.newLable }
                }

                return option
            })
            data[action.payload.eleId] = { ...data[action.payload.eleId], defultProp: updatedProps }

            return data

        case ADD_MORE_OPTION:
            console.log(action.payload)
            let oldOptions = data[action.payload.element.id].defultProp
            let newOptions = [...oldOptions, action.payload.data]
            data[action.payload.element.id] = { ...data[action.payload.element.id], defultProp: newOptions }
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

export const selectElementReducer = (state = {}, action) => {
    let data = { ...state }

    switch (action.type) {
        case CHANGE_SELECT_LABLE:
            data[action.payload.id] = { ...data[action.payload.id], lable: action.payload.lable, type: action.payload.type }
            return data

        default:
            return state
    }
}