require('dotenv').config()

const mongoConnect = process.env.CONNECT_DB ?? ''

const corsOptions = {
    origin: "*"
}

const config = {
    authRequired: true,
    auth0Logout: true,
    secret: process.env.SECRETAUTH0,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUERBASEURL
  };

export {
    mongoConnect,
    config,
    corsOptions
}