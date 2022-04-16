"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./api/users/routes"));

var _routes2 = _interopRequireDefault(require("./api/auth/routes"));

var _config = require("./config");

var _response = _interopRequireDefault(require("express/lib/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  auth
} = require('express-openid-connect');

_mongoose.default.connect(_config.mongoConnect);

_mongoose.default.connection.on("error", error => {
  console.log("Conexion a mongo error: ", error);
});

_mongoose.default.connection.on("connected", (error, response) => {
  console.log('Conexión con Mongo exitosa');
});

const error = require('http-errors');

const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const cookieParser = require('cookie-parser');

const log = require('morgan');

const app = express();
console.log("App corriendo");
app.use((0, _cors.default)());
app.use(log('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views')); //auth0
// app.use(auth(config));
// //Rutas
// app.get('/', (req, res) => {
//     if (!(req.oidc.isAuthenticated())) {
//         res.status(403).send('Es necesario iniciar sesión');
//     }
//     res.status(200).send('Bienvenido')
// })

app.use('/auth', _routes2.default);
app.use('/users', _routes.default);
app.use((req, res) => {
  return res.status(404).json({
    cose: 404,
    message: 'Ruta desconocida'
  });
}); //Error 404
// app.use((res, res, next) => {
//     next(error(404))
// })

app.use((err, req, res, next) => {
  res = err.message;
  res = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  return res.render('error');
});
var _default = app;
exports.default = _default;