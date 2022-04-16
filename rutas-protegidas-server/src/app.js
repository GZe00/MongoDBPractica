import mongoose from 'mongoose'
import cors from 'cors'
import usersRoutes from './api/users/routes'
import authRoutes from './api/auth/routes'
import { mongoConnect, config, corsOptions } from './config'
import res from 'express/lib/response'

const { auth } = require('express-openid-connect');


mongoose.connect(mongoConnect)

mongoose.connection.on("error", error => {
    console.log("Conexion a mongo error: ", error)
})

mongoose.connection.on("connected", (error, response) => {
    console.log('Conexión con Mongo exitosa')
})

const error = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const log = require('morgan')

const app = express();
console.log("App corriendo")

app.use(cors())
app.use(log('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));

//auth0
// app.use(auth(config));

// //Rutas
// app.get('/', (req, res) => {
//     if (!(req.oidc.isAuthenticated())) {
//         res.status(403).send('Es necesario iniciar sesión');
//     }
//     res.status(200).send('Bienvenido')
// })
app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use((req, res) => {
    return res.status(404).json({
        cose: 404,
        message: 'Ruta desconocida'
    })
})
//Error 404
// app.use((res, res, next) => {
//     next(error(404))
// })

app.use((err, req, res, next) => {
    res = err.message;
    res = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    return res.render('error');
});


export default app

