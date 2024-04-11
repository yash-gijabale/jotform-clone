import express from "express";
import { deleteForm, deleteManyForm, getAllForms, getFormById, getFormSubmissions, newForm, submitFormResponce, updateForm } from "../controller/formController.js";

const formRoute = express.Router()

formRoute.post('/new', newForm)
formRoute.put('/:id', updateForm)
formRoute.get('/single/:id', getFormById)
formRoute.get('/all', getAllForms)
formRoute.delete('/:id', deleteForm)
formRoute.post('/deleteMany/delete', deleteManyForm)


formRoute.post('/submit/:id', submitFormResponce)

formRoute.get('/submissions/:id', getFormSubmissions)



export default formRoute