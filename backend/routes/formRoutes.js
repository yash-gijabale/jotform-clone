import express from "express";
import { newForm, updateForm } from "../controller/formController.js";

const formRoute = express.Router()

formRoute.post('/new', newForm)
formRoute.put('/:id', updateForm)


export default formRoute