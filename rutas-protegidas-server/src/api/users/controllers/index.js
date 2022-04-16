import * as userService from '../services'

const getProfile = async (req, res) => {
    const { user } = req.user
    if (!user) {
        return res.status(400).send({
            code: 400,
            message: 'Usuario no válido, error de token'
        })
    }
    const data = await userService.getUser(user)
    if (!data) {
        return res.status(404).send({
            code: 404,
            message: 'User not found'
        })
    }

    return res.status(200).send({
        code: 200,
        data
    })
}


export {
    getProfile
}