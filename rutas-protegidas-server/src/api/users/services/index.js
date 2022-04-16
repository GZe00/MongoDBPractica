import * as usersCollections from '../../auth/models/index'

const getUser = async (id) => {
    return await usersCollections.findById(id)
}

export {
    getUser
}