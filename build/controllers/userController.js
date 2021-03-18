"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postChangePassword = exports.getChangePassword = exports.postEditProfile = exports.getEditProfile = exports.userDetail = exports.me = exports.logout = exports.postGithubLogIn = exports.githubLoginCallback = exports.githubLogin = exports.postlogin = exports.getlogin = exports.postJoin = exports.getJoin = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  res.render("join", {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, name, email, password, password2, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

            if (!(password != password2)) {
              _context.next = 6;
              break;
            }

            res.status(400);
            res.render("join", {
              pageTitle: "Join"
            });
            _context.next = 19;
            break;

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return (0, _user["default"])({
              name: name,
              email: email
            });

          case 9:
            user = _context.sent;
            _context.next = 12;
            return _user["default"].register(user, password);

          case 12:
            // 주어진 암호로 새 사용자 인스턴스를 등록하는 편리한 방법입니다.
            next();
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);
            res.redirect(_routes["default"].home);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 15]]);
  }));

  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getlogin = function getlogin(req, res) {
  res.render("login", {
    pageTitle: "Login"
  });
};

exports.getlogin = getlogin;

var postlogin = _passport["default"].authenticate("local", {
  failureRedirect: _routes["default"].login,
  successRedirect: _routes["default"].home
}); // local은 우리가 설치해준 Strategy 이름, failure는 로그인 실패하면 가는곳, success 성공하면
//github 유저 로그인 시키기


exports.postlogin = postlogin;

var githubLogin = _passport["default"].authenticate("github"); //github 로그인 하면 콜백으로 유저 정보 가지고옴


exports.githubLogin = githubLogin;

var githubLoginCallback = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(accessToken, refreshToken, profile, cb) {
    var _profile$_json, id, avatar_url, name, email, user, newUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _profile$_json = profile._json, id = _profile$_json.id, avatar_url = _profile$_json.avatar_url, name = _profile$_json.name, email = _profile$_json.email; // 유저정보 가져오는데 성공시

            _context2.prev = 1;
            _context2.next = 4;
            return _user["default"].findOne({
              email: email
            });

          case 4:
            user = _context2.sent;

            if (!user) {
              _context2.next = 9;
              break;
            }

            user.githubId = id; // github ID

            user.save();
            return _context2.abrupt("return", cb(null, user));

          case 9:
            _context2.next = 11;
            return _user["default"].create({
              email: email,
              name: name,
              githubId: id,
              avatarUrl: avatar_url
            });

          case 11:
            newUser = _context2.sent;
            return _context2.abrupt("return", cb(null, newUser));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", cb(_context2.t0));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 15]]);
  }));

  return function githubLoginCallback(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.githubLoginCallback = githubLoginCallback;

var postGithubLogIn = function postGithubLogIn(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postGithubLogIn = postGithubLogIn;

var logout = function logout(req, res) {
  req.logout();
  res.redirect(_routes["default"].home);
}; //export const users = (req, res) => res.render("users", { pageTitle: "Users" });


exports.logout = logout;

var me = function me(req, res) {
  res.render("userDetail", {
    pageTitle: "UserDetail",
    user: req.user
  });
};

exports.me = me;

var userDetail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _user["default"].findById(id).populate("videos");

          case 4:
            user = _context3.sent;
            // findbyId찾을때 등록하지 않은 id이면 error 발생하여 catch가 대신 처리
            console.log(user);
            res.render("userDetail", {
              pageTitle: "UserDetail",
              user: user
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            // console.log("하하하하");
            res.redirect(_routes["default"].home);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));

  return function userDetail(_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;

var getEditProfile = function getEditProfile(req, res) {
  return res.render("editProfile", {
    pageTitle: "Edit Profile"
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, name, email, file;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, file = req.file;
            _context4.prev = 1;
            _context4.next = 4;
            return _user["default"].findByIdAndUpdate(req.user.id, {
              name: name,
              email: email,
              avatarUrl: file ? file.path : req.user.avatarUrl // Update 함수로 userDB 수정하기 때문에 넣지 않으면 NULL값으로 들어가짐.

            });

          case 4:
            // 기존 avatarUrl은 당연히 새로 Update 하기 때문에 다시 넣어 줘야함. 
            res.redirect(_routes["default"].me);
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            res.redirect(_routes["default"].editProfile);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7]]);
  }));

  return function postEditProfile(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;

var getChangePassword = function getChangePassword(req, res) {
  return res.render("changePassword", {
    pageTitle: "ChangePassword"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body3, oldPassword, newPassword, newPassword1;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, newPassword1 = _req$body3.newPassword1;
            _context5.prev = 1;

            if (!(newPassword !== newPassword1)) {
              _context5.next = 6;
              break;
            }

            // 200으로 하면 비밀번호 변경하라고 구글이 경고함.
            res.status(400); // 매번 구글은 패스워드라고 불리는 필드 찾아냄 200 못 보냄

            req.redirect("/users/".concat(_routes["default"].changePassword));
            return _context5.abrupt("return");

          case 6:
            _context5.next = 8;
            return req.user.changePassword(oldPassword, newPassword);

          case 8:
            // passport API
            res.redirect(_routes["default"].me);
            _context5.next = 15;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](1);
            res.status(400);
            res.redirect("/users/".concat(_routes["default"].changePassword));

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 11]]);
  }));

  return function postChangePassword(_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;