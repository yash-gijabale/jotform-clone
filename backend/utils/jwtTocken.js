import jwt from 'jsonwebtoken'

const key = "MBFDJKHWEUG#%@KJSDFSHJ54564TF28906I45HJHBJHBD#%#%&@DFKJGSKLDJRHIE3RE"

export const getJwtToken = (id) => {
    return jwt.sign({ id: id }, key, {
        expiresIn: '5d'
    })
}

export const sendToken = async (user, res) => {
    const token = getJwtToken(user.id)
    res.cookie('token', token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        user,
        token
    })
}