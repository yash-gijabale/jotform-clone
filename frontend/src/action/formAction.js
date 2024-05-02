import {
    ALL_FORM_FAIL, ALL_FORM_REQUEST,
    ALL_FORM_SUCCESS,
    NEW_FORM_FAIL,
    NEW_FORM_REQUEST,
    NEW_FORM_SUCCESS,
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
    ADD_MORE_OPTION,
    SET_MAULTI_CHOISE_OPTION_LAYOUT,
    DELETE_ELEMENT
} from '../constant/formConstant.js'
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
            payload: data.data
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

        const { data } = await axios.post('/api/v1/form/new', fromData, {
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

export const inputElementProperty = (data, element) => (dispatch) => {
    let inputData = {
        id: element.id,
        type: element.element,
        lable: data
    }
    dispatch({
        type: LABALE_CHANGE,
        payload: inputData
    })
}

export const inputElementPlaceholder = (data, element) => (dispatch) => {
    let property = {
        id: element.id,
        type: element.element,
        placeholder: data
    }

    dispatch({
        type: CHANGE_INPUT_PLACEHOLDER,
        payload: property
    })
}

export const setCheckboxElementProperty = (data, element) => (dispatch) => {
    let property = {}
    switch (data.type) {
        case 'lable':
            property = {
                id: element.id,
                type: element.element,
                lable: data.lable
            }

            dispatch({
                type: CHANGE_CHECKBOX_LABLE,
                payload: property
            })
            return
        case 'isRequired':
            property = {
                id: element.id,
                type: element.element,
                isRequired: data.isRequired
            }

            dispatch({
                type: CHANGE_CHECKBOX_REQUIRED,
                payload: property
            })
            return


        case 'title':
            property = {
                id: element.id,
                type: element.element,
                title: data.title
            }

            dispatch({
                type: CHANGE_CHECKBOX_TITLE,
                payload: property
            })
            return


        default:
            break;
    }
}

export const setSelectElementProperty = (data, element) => (dispatch) => {
    let property = {}
    switch (data.type) {
        case 'lable':
            property = {
                id: element.id,
                type: element.element,
                lable: data.lable
            }

            dispatch({
                type: CHANGE_SELECT_LABLE,
                payload: property
            })
            return

        case 'options':
            property = {
                id: element.id,
                type: element.element,
                options: data.options
            }

            dispatch({
                type: SET_SELECT_OPTION,
                payload: property
            })
            return


        default:
            break;
    }

}

export const datePickerProperties = (data, element) => (dispatch) => {
    let property = {}

    switch (data.type) {
        case 'lable':
            property = {
                id: element.id,
                type: element.element,
                lable: data.lable
            }

            dispatch({
                type: CHANGE_DATE_LABLE,
                payload: property
            })
            return

        case 'placeholder':
            property = {
                id: element.id,
                type: element.element,
                placeholder: data.placeholder
            }

            dispatch({
                type: CHANGE_DATE_PLACEHOLDER,
                payload: property
            })
            return

        default:
            break;
    }
}

export const setDefultOptions = (element) => (dispatch) => {
    let defaultFiled = [
        {
            id: 1,
            lable: "Type a Question",
            value: "typeQuestion",
            checked: false,
        },
        {
            id: 2,
            lable: "Type a Question",
            value: "typeQuestion",
            checked: true,
        }
    ]

    let property = {
        element,
        defaultFiled
    }

    dispatch({
        type: SET_DEFULT_MULTI_CHOISE_OPTION,
        payload: property
    })
}

export const changeOptionLable = (newlable, option, element) => (dispatch) => {
    dispatch({
        type: SET_LABLE_CHOISE_OPTION,
        payload: {
            id: option.id,
            newLable: newlable,
            eleId: element.id
        }
    })
}

export const addMoreOptions = (ele) => (dispatch) =>{
    dispatch({
        type: ADD_MORE_OPTION,
        payload: ele
    })
}

export const setOptionLayout = (layout, element) => (dispatch) =>{
    dispatch({
        type: SET_MAULTI_CHOISE_OPTION_LAYOUT,
        payload: {
            id: element.id,
            layout: layout
        }
    })
}

export const removeElement = (element) => (dispatch) =>{
    dispatch({
        type: DELETE_ELEMENT,
        payload: element
    })
}

export const multipleChoiseProperties = (data, element) => async (dispatch) => {
    switch (data.type) {
        case 'setCheckbox':


            break;

        default:
            break;
    }
}

export const getFormProperties = (formId) => async (dispatch) => {
    const { data } = await axios.get(`/api/v1/form/single/${formId}`)
    console.log(data.data)
    if (data.data.properties === null) {
        return {
            properties: {
                currentId: 1,
                element: [],
            },
            formData: data.data
        }
    }
    dispatch({
        type: SET_PREVIOUS_FORM,
        payload: data.data.properties
    })
    // console.log(preForm.properties);
    let pdata = {
        currentId: 0,
        element: []
    }

    for (let key in data.data.properties) {
        let element = {
            id: key,
            element: data.data.properties[key].type
        }

        pdata.element.push(element)
        pdata.currentId = Number(key) + 1

    }

    return {
        properties: pdata,
        formData: data.data
    }
}

