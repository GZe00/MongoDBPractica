import * as mongoose from 'mongoose';
import registerSchema from './authSchema'
const ObjectId = require('mongoose').Types.ObjectId; 

const create = async (userInfo) => {
    const registerModel = mongoose.model('user', registerSchema)
    return await registerModel.create(userInfo)
}

const findByUsername = async (username) => {
    const registerModel = mongoose.model('user', registerSchema)
    return await registerModel.findOne({ "username": username })
}

const findByEmail = async (email) => {
    const registerModel = mongoose.model('user', registerSchema)
    return await registerModel.findOne({ "email": email })
}

const findById = async (id) => {
    let query = { "_id": new ObjectId(id) };
    const registerModel = mongoose.model('user', registerSchema)
    return await registerModel.find(query)
}

const search = async (userInfo) => {
    const registerModel = mongoose.model('user', registerSchema)
    return await registerModel.findOne({ "email": userInfo.email })

}

export {
    create,
    search,
    findById,
    findByUsername,
    findByEmail
}