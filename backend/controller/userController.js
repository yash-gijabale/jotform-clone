import { PrismaClient } from '@prisma/client'
import ErrorHandler from '../utils/ErrorHandler.js'
import bcrypt from 'bcrypt'
import { checkPassword, encryptPassword } from '../utils/encrypte.js'
import { sendToken } from '../utils/jwtTocken.js'


const prisma = new PrismaClient()

export const createUser = async (req, res, next) => {
    try {

        const userData = req.body

        userData['password'] = await encryptPassword(req.body.password)
        console.log(userData)
        // return
        const newUser = await prisma.user.create({
            data: userData
        })

        await sendToken(newUser, res)

    } catch (error) {
        return next(new ErrorHandler(error.message, 401))
    }

}

export const login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        return next(new ErrorHandler('Please specify email and password', 401))
    }

    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if (!user) {
        return next(new ErrorHandler('Invaid email or password', 401))
    }

    const validPassword = await checkPassword(password, user.password)
    if (!validPassword) {
        return next(new ErrorHandler('Invaid email or password', 401))
    }

    delete user['password']

    await sendToken(user, res)


}


export const logout = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: 'Logout succefully'
    })
}

export const profile = async (req, res, next) => {
    try {
        const userId = req.user.id

        const profile = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        if (!profile) {
            return next(new ErrorHandler('Invaid user ID', 401))
        }

        res.status(200).json({
            success: true,
            data: profile
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 401))

    }


}