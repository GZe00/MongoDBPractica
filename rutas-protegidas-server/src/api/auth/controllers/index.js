import * as authService from '../services'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
    const data = req.body

    if (!data) {
        return res.status(400).send({
            code: 400,
            message: 'Sin datos'
        })
    }
    if (!data.name) {
        return res.status(400).send({
            code: 400,
            message: 'Nombre es requerido'
        })
    }
    if (!data.username) {
        return res.status(400).send({
            code: 400,
            message: 'Nombre de usuario es requerido'
        })
    }
    if (!data.email) {
        return res.status(400).send({
            code: 400,
            message: 'Email es requerido'
        })
    }
    if (!data.password) {
        return res.status(400).send({
            code: 400,
            message: 'Contraseña es requerido'
        })
    }

    // find email
    // find username

    const email = await authService.findByEmail(data.email)
    if (email) {
        return res.status(400).send({
            code: 400,
            message: 'Email ya registrado'
        })
    }
    const username = await authService.findByUsername(data.username)
    if (username) {
        return res.status(400).send({
            code: 400,
            message: 'Nombre de usuario ya utilizado'
        })
    }
    if(!data.lastname)
        data.lastname = ''
    data.password = await encrypt(data.password)

    const user = await authService.newUser(data)

    if (!user) {
        return res.status(400).send({
            code: 400,
            message: 'Sucedió un error'
        })
    }
    return res.status(200).send({
        code: 200,
        message: 'Nuevo usuario registrado'
    })
}

const loginUser = async (req, res) => {
    const data = req.body

    if (!data) {
        return res.status(400).send({
            code: 400,
            message: 'No se proporcionaron datos'
        })
    }

    if (!data.email) {
        return res.status(400).send({
            code: 400,
            message: 'No se proporcionó email'
        })
    }
    if (!data.password) {
        return res.status(400).send({
            code: 400,
            message: 'No se proporcionó contraseña'
        })
    }
    const user = await authService.logIn(data)

    if (!user) {
        return res.status(400).send({
            code: 400,
            message: `Correo electrónico y/o contraseña incorrecto`
        })
    }
    const token = jwt.sign({ user }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    return res.status(200).send({
        code: 200,
        token
    })

}

const encrypt = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
};


export {
    createUser,
    loginUser
}