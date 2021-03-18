"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _userController = require("./controllers/userController");

var _user = _interopRequireDefault(require("./models/user"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// passport가 사용자 인증을 처리할 수 있도록 설정
_passport["default"].use(_user["default"].createStrategy());

_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GIT_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].gitHubCallback)
}, _userController.githubLoginCallback));

_passport["default"].serializeUser(_user["default"].serializeUser()); // 쿠키에는 user.id만 담아서 보내


_passport["default"].deserializeUser(_user["default"].deserializeUser());