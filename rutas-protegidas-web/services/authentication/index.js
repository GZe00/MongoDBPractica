import { config } from '../../config'

const login = async (userInfo) => {
    return new Promise((resolve, reject) => {
        fetch(`${config.base}/auth/login`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(response => {
                if (response) {
                    response.json().then(data => {
                        if (data.code !== 200) {
                            reject({
                                status: false,
                                message: data.message
                            })
                        } else {
                            resolve({
                                status: 200,
                                token: data.token
                            })
                        }
                    })
                        .catch(error => {
                            console.log(error)
                            reject(error)
                        })
                }
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}

const create = async (userInfo) => {
    return new Promise((resolve, reject) => {
        fetch(`${config.base}/auth/register`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(response => {
                if (response) {
                    response.json().then(data => {
                        if (data.code !== 200) {
                            reject({
                                status: false,
                                message: data.message
                            })
                        } else {
                            resolve({
                                status: 200
                            })
                        }
                    })
                        .catch(error => {
                            console.log(error)
                            reject(error)
                        })
                }
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}

const getUser = async (api) => {
    return new Promise((resolve, reject) => {
        fetch(`${config.base}/users`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${api}`,
            },
        })
            .then(response => {
                if (response) {
                    response.json().then(data => {
                        if (data.code !== 200) {
                            reject({
                                status: false,
                                message: data.message
                            })
                        } else {
                            resolve(data)
                        }
                    })
                        .catch(error => {
                            console.log(error)
                            reject(error)
                        })
                }
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}

export {
    login,
    create,
    getUser
}