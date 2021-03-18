"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postAddComment = exports.postRegisterView = exports.deleteVideo = exports.posteditVideo = exports.geteditVideo = exports.videoDetail = exports.postupload = exports.getupload = exports.search = exports.home = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _video = _interopRequireDefault(require("../models/video"));

var _comment = _interopRequireDefault(require("../models/comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var videos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _video["default"].find({}).sort({
              _id: -1
            });

          case 3:
            videos = _context.sent;
            res.render("home", {
              pageTitle: "Home",
              videos: videos
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.render("home", {
              pageTitle: "Home",
              videos: []
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var search = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var searchingBy, Videos;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchingBy = req.query.term;
            Videos = [];
            _context2.prev = 2;
            _context2.next = 5;
            return _video["default"].find({
              title: {
                $regex: searchingBy,
                $options: "i"
              }
            });

          case 5:
            Videos = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 11:
            res.render("search", {
              pageTitle: "Searchs",
              searchingBy: searchingBy,
              Videos: Videos
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //export const video = (req, res) =>
// res.render("videos", { pageTitle: "Videos" });


exports.search = search;

var getupload = function getupload(req, res) {
  return res.render("upload", {
    pageTitle: "Upload"
  });
};

exports.getupload = getupload;

var postupload = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, description, path, newVideo;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, path = req.file.path;
            _context3.next = 3;
            return _video["default"].create({
              fileUrl: path,
              title: title,
              description: description,
              creator: req.user.id
            });

          case 3:
            newVideo = _context3.sent;
            req.user.videos.push(newVideo.id);
            req.user.save(); //console.log(newVideo);

            res.redirect(_routes["default"].videoDetail(newVideo.id));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postupload(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postupload = postupload;

var videoDetail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, Video;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _video["default"].findById(id).populate("creator").populate("comments");

          case 4:
            Video = _context4.sent;
            //  console.log(Video); //populate 객체를 대려오는 함수 object ID type만 쓸 수 있음
            res.render("videoDetail", {
              pageTitle: Video.title,
              Video: Video
            });
            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.redirect(_routes["default"].home);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function videoDetail(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.videoDetail = videoDetail;

var geteditVideo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, Video;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _video["default"].findById(id);

          case 4:
            Video = _context5.sent;

            if (!(Video.creator != req.user.id)) {
              _context5.next = 9;
              break;
            }

            throw Error();

          case 9:
            res.render("editVideo", {
              pageTitle: "Edit ".concat(Video.title),
              Video: Video
            });

          case 10:
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            res.redirect(_routes["default"].home);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));

  return function geteditVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.geteditVideo = geteditVideo;

var posteditVideo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _req$body2, title, description;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context6.prev = 1;
            _context6.next = 4;
            return _video["default"].findOneAndUpdate({
              _id: id
            }, {
              title: title,
              description: description
            });

          case 4:
            res.redirect(_routes["default"].videoDetail(id));
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            res.redirect(_routes["default"].home);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function posteditVideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.posteditVideo = posteditVideo;

var deleteVideo = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, Video;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.prev = 2;
            _context7.next = 5;
            return _video["default"].findById(id);

          case 5:
            Video = _context7.sent;

            if (!(Video.creator != req.user.id)) {
              _context7.next = 10;
              break;
            }

            throw Error();

          case 10:
            _context7.next = 12;
            return _video["default"].findOneAndRemove({
              _id: id
            });

          case 12:
            _context7.next = 17;
            break;

          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](2);
            res.redirect(_routes["default"].home);

          case 17:
            _context7.next = 21;
            break;

          case 19:
            _context7.prev = 19;
            _context7.t1 = _context7["catch"](1);

          case 21:
            res.redirect(_routes["default"].home);

          case 22:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 19], [2, 14]]);
  }));

  return function deleteVideo(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //API View Server(database)와 소통


exports.deleteVideo = deleteVideo;

var postRegisterView = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, Video;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.prev = 1;
            _context8.next = 4;
            return _video["default"].findById(id);

          case 4:
            Video = _context8.sent;
            Video.views += 1;
            Video.save();
            res.status(200); // 200 == OK

            _context8.next = 14;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](1);
            res.status(400);
            res.end();

          case 14:
            _context8.prev = 14;
            res.end(); // 요청 끝냄.

            return _context8.finish(14);

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 10, 14, 17]]);
  }));

  return function postRegisterView(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}(); //API comment


exports.postRegisterView = postRegisterView;

var postAddComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var id, comment, user, Video, newComment;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id, comment = req.body.comment, user = req.user;
            _context9.prev = 1;
            _context9.next = 4;
            return _video["default"].findById(id);

          case 4:
            Video = _context9.sent;
            _context9.next = 7;
            return _comment["default"].create({
              text: comment,
              creator: user.id
            });

          case 7:
            newComment = _context9.sent;
            Video.comments.push(newComment.id);
            Video.save();
            _context9.next = 15;
            break;

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](1);
            res.status(400);

          case 15:
            _context9.prev = 15;
            res.end();
            return _context9.finish(15);

          case 18:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 12, 15, 18]]);
  }));

  return function postAddComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.postAddComment = postAddComment;