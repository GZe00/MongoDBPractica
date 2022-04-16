"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = exports.createUser = void 0;

require("core-js/modules/es.promise.js");

var authService = _interopRequireWildcard(require("../services"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const createUser = async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).send({
      code: 400,
      message: 'Sin datos'
    });
  }

  if (!data.name) {
    return res.status(400).send({
      code: 400,
      message: 'Nombre es requerido'
    });
  }

  if (!data.username) {
    return res.status(400).send({
      code: 400,
      message: 'Nombre de usuario es requerido'
    });
  }

  if (!data.email) {
    return res.status(400).send({
      code: 400,
      message: 'Email es requerido'
    });
  }

  if (!data.password) {
    return res.status(400).send({
      code: 400,
      message: 'Contraseña es requerido'
    });
  } // find email
  // find username


  const email = await authService.findByEmail(data.email);

  if (email) {
    return res.status(400).send({
      code: 400,
      message: 'Email ya registrado'
    });
  }

  const username = await authService.findByUsername(data.username);

  if (username) {
    return res.status(400).send({
      code: 400,
      message: 'Nombre de usuario ya utilizado'
    });
  }

  if (!data.lastname) data.lastname = '';
  data.password = await encrypt(data.password);
  const user = await authService.newUser(data);

  if (!user) {
    return res.status(400).send({
      code: 400,
      message: 'Sucedió un error'
    });
  }

  return res.status(200).send({
    code: 200,
    message: 'Nuevo usuario registrado'
  });
};

exports.createUser = createUser;

const loginUser = async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).send({
      code: 400,
      message: 'No se proporcionaron datos'
    });
  }

  if (!data.email) {
    return res.status(400).send({
      code: 400,
      message: 'No se proporcionó email'
    });
  }

  if (!data.password) {
    return res.status(400).send({
      code: 400,
      message: 'No se proporcionó contraseña'
    });
  }

  const user = await authService.logIn(data);

  if (!user) {
    return res.status(400).send({
      code: 400,
      message: "Correo electr\xF3nico y/o contrase\xF1a incorrecto"
    });
  }

  const token = _jsonwebtoken.default.sign({
    user
  }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24
  });

  return res.status(200).send({
    code: 200,
    token
  });
};

exports.loginUser = loginUser;

const encrypt = async password => {
  const salt = await _bcryptjs.default.genSalt(10);
  return await _bcryptjs.default.hash(password, salt);
};