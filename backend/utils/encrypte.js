import bcrypt from 'bcrypt'


export const encryptPassword = async (password) =>{
    const enPass = await bcrypt.hash(password, 10)

    return enPass
}

export const checkPassword = async (password, dbPassword) =>{
    return await bcrypt.compare(password, dbPassword)
}