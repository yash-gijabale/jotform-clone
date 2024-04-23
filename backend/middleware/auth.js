import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import ErrorHandler from '../utils/ErrorHandler.js'

const key = "MBFDJKHWEUG#%@KJSDFSHJ54564TF28906I45HJHBJHBD#%#%&@DFKJGSKLDJRHIE3RE"

const prisma = new PrismaClient()

export const checkAuth = async (req, res, next) => {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            success: false,
            error:"Login To access"
        })
    }

    const { id } = jwt.verify(token, key)

    const user = await prisma.user.findFirst({
        where:{
            id:id,
        },
    })

    delete user.password
    req.user = user
    next()
}
