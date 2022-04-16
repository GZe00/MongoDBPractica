"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = exports.findByUsername = exports.findById = exports.findByEmail = exports.create = void 0;

require("core-js/modules/es.promise.js");

var mongoose = _interopRequireWildcard(require("mongoose"));

var _authSchema = _interopRequireDefault(require("./authSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ObjectId = require('mongoose').Types.ObjectId;

const create = async userInfo => {
  const registerModel = mongoose.model('user', _authSchema.default);
  return await registerModel.create(userInfo);
};

exports.create = create;

const findByUsername = async username => {
  const registerModel = mongoose.model('user', _authSchema.default);
  return await registerModel.findOne({
    "username": username
  });
};

exports.findByUsername = findByUsername;

const findByEmail = async email => {
  const registerModel = mongoose.model('user', _authSchema.default);
  return await registerModel.findOne({
    "email": email
  });
};

exports.findByEmail = findByEmail;

const findById = async id => {
  let query = {
    "_id": new ObjectId(id)
  };
  const registerModel = mongoose.model('user', _authSchema.default);
  return await registerModel.find(query);
};

exports.findById = findById;

const search = async userInfo => {
  const registerModel = mongoose.model('user', _authSchema.default);
  return await registerModel.findOne({
    "email": userInfo.email
  });
};

exports.search = search;