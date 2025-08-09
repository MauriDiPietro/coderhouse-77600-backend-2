import bcrypt from 'bcrypt'

// console.log(bcrypt.hashSync('1234', bcrypt.genSaltSync(10)))

// console.log(bcrypt.compareSync('1234', '$2b$10$hWdk65GZkvxAuCxj0MZnGOpEbn9lfoxbmVO0kn0DdaQ3rLxx8v9ha'));

/**
 * Metodo que recibe la contraseña en texto plano y retorna la misma hasheada
 * @param {String} password 
 * @returns 
 */
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

/**
 * 
 * @param {String} passwordPlain 
 * @param {String} passwordHash 
 * @returns 
 */
export const isValidPass = (passwordPlain, passwordHash) => {
    return bcrypt.compareSync(passwordPlain, passwordHash)
}
