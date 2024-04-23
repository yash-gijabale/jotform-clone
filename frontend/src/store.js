import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { addForm, checkboxElementReducer, formReducer, inputElementReducer } from './reducer/formReducer'
import { userReducer } from './reducer/userReducer'


const reducers = combineReducers({
    forms: formReducer,
    newForm: addForm,
    property: inputElementReducer,
    // CheckboxElement: checkboxElementReducer
    user: userReducer

})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducers, initialState, applyMiddleware(...middleware))

export default store