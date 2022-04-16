"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const tokenError = new Error("No se proporcionó el token");
    tokenError.name = "JsonWebTokenError";
    return res.status(400).send({
      code: 400,
      message: tokenError
    });
  }

  try {
    const decoded = await jwt.verify(token.split("Bearer ")[1], process.env.SECRET);
    req.user = decoded;
    return next(); //token valido
  } catch (error) {
    return res.status(400).send({
      code: 400,
      message: error
    }); //token invalido
  }
};

exports.isAuthenticated = isAuthenticated;