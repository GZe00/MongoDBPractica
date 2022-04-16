import * as registerCollection from '../models/'
import bcryptjs from "bcryptjs";

const newUser = async (data) => {
    return await registerCollection.create(data)
}

const findByEmail = async (email) => {
    return await registerCollection.findByEmail(email)
}

const findByUsername = async (username) => {
    return await registerCollection.findByUsername(username)
}

const logIn = async (data) => {
    const user = await registerCollection.search(data)
    if (!user) {
        return false
    }
    const matchPassword = await bcryptjs.compare(data.password, user.password)

    if (!matchPassword) {
        return false
    }

    return user._id

    // if (matchPassword) {
    //     const token = jwt.sign({ id: teacherDB.id, role_id: teacherDB.role_id }, secret.SECRET, {
    //         expiresIn: 60 * 60 * 24,
    //     });
    //}
}


export {
    newUser,
    findByEmail,
    findByUsername,
    logIn
}