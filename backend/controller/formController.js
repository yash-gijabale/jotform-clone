import { Prisma, PrismaClient } from "@prisma/client";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendmail } from "../utils/sendEmail.js";
import { createExel } from "../utils/excel.js";


const prisma = new PrismaClient()

export const newForm = async (req, res, next) => {
    try {
        let formData = req.body
        formData['userId'] = req.user.id
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

export const getAllForms = async (req, res, next) => {
    console.log("user erwsdfsf", req.user)
    let forms = await prisma.form.findMany({
        where: {
            userId: req.user.id
        }
    })

    let formData = await Promise.all(forms.map(async (form) => {
        let count = await prisma.submission.count({
            where: {
                formId: form.id
            }
        })

        let data = { ...form, total: count }

        return data
    }))

    res.status(200).json({
        success: true,
        data: formData ? formData : []
    })
}

export const deleteForm = async (req, res, next) => {
    try {
        const formId = req.params.id

        const isExist = await prisma.form.findFirst({
            where: {
                id: formId
            }
        })

        if (!isExist) {
            return next(new ErrorHandler('Form not found !', 404))
        }

        const delForm = await prisma.form.delete(
            {
                where: {
                    id: formId
                }
            }
        )

        res.status(200).json({
            success: true,
            data: delForm
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))

    }

}

export const deleteManyForm = async (req, res, next) => {
    try {

        const formIds = req.body.formIds
        console.log(formIds)
        if (formIds.length) {

            const deletedForms = await prisma.form.deleteMany({
                where: {
                    id: {
                        in: formIds
                    }
                }
            })
            res.status(200).json({
                success: true,
                data: deletedForms
            })
        } else {
            return next(new ErrorHandler('Invalid', 400))

        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

export const getFormById = async (req, res, next) => {

    const formId = req.params.id
    try {
        const form = await prisma.form.findFirst({
            where: {
                id: formId
            }
        })

        // if (!form) {
        //     res.status(404).json({
        //         success: false,
        //         dataf: {}
        //     })
        // }

        res.status(200).json({
            success: true,
            data: form
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))

    }

}


export const submitFormResponce = async (req, res, next) => {
    try {
        const formId = req.params.id

        const formResponce = req.body
        console.log(formResponce)

        const formEmail = await prisma.form.findFirst({
            where: {
                id: formId
            },
            include: {
                user: true
            }
        })

        console.log(formEmail)

        const data = {
            responce: formResponce,
            formId
        }

        const submissionData = await prisma.submission.create({
            data
        })


        res.status(200).json({
            success: true,
            data: submissionData
        })

        sendmail(res, formEmail, formResponce)

    } catch (error) {
        console.log('err', error)
        return next(new ErrorHandler(error.message, 400))

    }
}

export const getFormSubmissions = async (req, res, next) => {
    try {

        const formId = req.params.id

        const submissions = await prisma.form.findFirst({
            where: {
                id: formId
            },
            include: {
                submissions: {
                    orderBy: {
                        id: 'desc'
                    }
                }
            },

        })

        res.status(200).json({
            success: true,
            data: submissions
        })


    } catch (error) {
        return next(new ErrorHandler(error.message, 400))

    }
}

export const upadateFormEmail = async (req, res, next) => {
    try {

        const formId = req.params.id

        const form = await prisma.form.update({
            where: {
                id: formId
            },
            data: req.body
        })

        res.status(200).json({
            success: true,
            data: form
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

export const getFormEail = async (req, res, next) => {
    try {
        const formId = req.params.id
        const form = await prisma.form.findFirst({
            where: {
                id: formId
            },
            select: {
                email: true
            }
        })

        res.status(200).json({
            success: true,
            data: form
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

export const downloadSubmissions = async (req, res, next) => {
    try {

        const formId = req.params.id
        const form = await prisma.form.findFirst({
            where: {
                id: formId
            },
            include:{
                submissions: true
            }
        })
        const submission = await prisma.submission.findMany({
            where: {
                formId
            }
        })
        await createExel(res, form)
        // console.log(submission)
       
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))

    }
}