import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { addForm, checkboxElementReducer, formReducer, inputElementReducer } from './reducer/formReducer'


const reducers = combineReducers({
    forms: formReducer,
    newForm: addForm,
    TextInput: inputElementReducer,
    // CheckboxElement: checkboxElementReducer

})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducers, initialState , applyMiddleware(...middleware))

export default store