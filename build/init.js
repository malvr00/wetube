"use strict";

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./db");

var _app = _interopRequireDefault(require("./app"));

require("./models/video");

require("./models/comment");

require("./models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT;

var handleListening = function handleListening() {
  return console.log("\u2714 Listening on: http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, handleListening);