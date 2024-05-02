import express from "express";
import { deleteForm, deleteManyForm, downloadSubmissions, getAllForms, getFormById, getFormEail, getFormSubmissions, newForm, submitFormResponce, upadateFormEmail, updateForm } from "../controller/formController.js";

const formRoute = express.Router()

formRoute.post('/new', newForm)
formRoute.put('/:id', updateForm)
formRoute.get('/all', getAllForms)
formRoute.delete('/:id', deleteForm)
formRoute.post('/deleteMany/delete', deleteManyForm)


formRoute.post('/submit/:id', submitFormResponce)

formRoute.get('/submissions/:id', getFormSubmissions)

formRoute.put('/addEmail/:id', upadateFormEmail)
formRoute.get('/email/:id', getFormEail)
formRoute.get('/download/:id', downloadSubmissions)

export default formRoute