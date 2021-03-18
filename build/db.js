"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  //userFindAndModify: false,
  useUnifiedTopology: true
});

_mongoose["default"].set('useCreateIndex', true);

var db = _mongoose["default"].connection;

var handleOpen = function handleOpen() {
  return console.log("✔ Connected to DB");
};

var handleError = function handleError() {
  return console.log("\uD83E\uDD23 Error on DB Connection error");
};

db.once("open", handleOpen);
db.on("error", handleError);