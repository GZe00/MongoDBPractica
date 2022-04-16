"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongoConnect = exports.corsOptions = exports.config = void 0;

var _process$env$CONNECT_;

require('dotenv').config();

const mongoConnect = (_process$env$CONNECT_ = process.env.CONNECT_DB) !== null && _process$env$CONNECT_ !== void 0 ? _process$env$CONNECT_ : '';
exports.mongoConnect = mongoConnect;
const corsOptions = {
  origin: "*"
};
exports.corsOptions = corsOptions;
const config = {
  authRequired: true,
  auth0Logout: true,
  secret: process.env.SECRETAUTH0,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL
};
exports.config = config;