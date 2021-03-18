"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var _localsmiddleware = require("../localsmiddleware");

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router(); //userRouter.get(routes.users, users);


userRouter.get(_routes["default"].editProfile, _localsmiddleware.onlyPrivate, _userController.getEditProfile);
userRouter.post(_routes["default"].editProfile, _localsmiddleware.onlyPrivate, _localsmiddleware.uploadAvatar, _userController.postEditProfile);
userRouter.get(_routes["default"].changePassword, _localsmiddleware.onlyPrivate, _userController.getChangePassword);
userRouter.post(_routes["default"].changePassword, _localsmiddleware.onlyPrivate, _userController.postChangePassword);
userRouter.get(_routes["default"].userDetail(), _userController.userDetail);
var _default = userRouter;
exports["default"] = _default;