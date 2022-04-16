"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUser = exports.logIn = exports.findByUsername = exports.findByEmail = void 0;

require("core-js/modules/es.promise.js");

var registerCollection = _interopRequireWildcard(require("../models/"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const newUser = async data => {
  return await registerCollection.create(data);
};

exports.newUser = newUser;

const findByEmail = async email => {
  return await registerCollection.findByEmail(email);
};

exports.findByEmail = findByEmail;

const findByUsername = async username => {
  return await registerCollection.findByUsername(username);
};

exports.findByUsername = findByUsername;

const logIn = async data => {
  const user = await registerCollection.search(data);

  if (!user) {
    return false;
  }

  const matchPassword = await _bcryptjs.default.compare(data.password, user.password);

  if (!matchPassword) {
    return false;
  }

  return user._id; // if (matchPassword) {
  //     const token = jwt.sign({ id: teacherDB.id, role_id: teacherDB.role_id }, secret.SECRET, {
  //         expiresIn: 60 * 60 * 24,
  //     });
  //}
};

exports.logIn = logIn;