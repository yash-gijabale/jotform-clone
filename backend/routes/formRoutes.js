import express from "express";
import { getAllForms, newForm, updateForm } from "../controller/formController.js";

const formRoute = express.Router()

formRoute.post('/new', newForm)
formRoute.put('/:id', updateForm)
formRoute.get('/all', getAllForms)


export default formRoute