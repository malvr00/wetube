"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passportLocalMongoose = _interopRequireDefault(require("passport-local-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// passport-local-mongoose 사용 할거라 password 따로 db 만들어 놓치 않음.
var UserSchema = new _mongoose["default"].Schema({
  name: String,
  email: String,
  avatarUrl: String,
  faceboockId: Number,
  githubId: Number,
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }],
  videos: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Video"
  }]
});
UserSchema.plugin(_passportLocalMongoose["default"], {
  usernameField: "email"
}); // 필드명시, 사용자이름과 패스워드 이용한 인증
// email이 될 수 있고 ID가 될수 있음.

var model = _mongoose["default"].model("User", UserSchema);

var _default = model;
exports["default"] = _default;