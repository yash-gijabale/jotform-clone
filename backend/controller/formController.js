import { PrismaClient } from "@prisma/client";
import ErrorHandler from "../utils/ErrorHandler.js";

const prisma = new PrismaClient()


export const newForm = async (req, res, next) => {
    try {
        let formData = req.body
        const form = await prisma.form.create({
            data: formData
        })

        res.status(200).json({
            success: true,
            data: form
        })

    } catch (e) {
        return next(new ErrorHandler(e.message, 400))
        // console.log(formData)
    }
}

export const updateForm = async (req, res, next) => {
    try {

        const formId = req.params.id
        const formData = req.body
        const isExist = prisma.form.findFirst({
            where: {
                id: formId
            }
        })

        if (!isExist) {
            return next(new ErrorHandler('Invalid form ID', 404))
        }

        const updatedForm = await prisma.form.update({
            where: {
                id: formId
            },
            data: formData
        })

        res.status(200).json({
            success: true,
            data: updatedForm
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}