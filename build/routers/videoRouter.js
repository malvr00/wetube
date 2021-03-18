"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoController = require("../controllers/videoController");

var _localsmiddleware = require("../localsmiddleware");

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router(); //videoRouter.get(routes.videos, video);


videoRouter.get(_routes["default"].upload, _localsmiddleware.onlyPrivate, _videoController.getupload);
videoRouter.post(_routes["default"].upload, _localsmiddleware.onlyPrivate, _localsmiddleware.uploadVideo, _videoController.postupload);
videoRouter.get(_routes["default"].videoDetail(), _videoController.videoDetail);
videoRouter.get(_routes["default"].editVideo(), _localsmiddleware.onlyPrivate, _videoController.geteditVideo);
videoRouter.post(_routes["default"].editVideo(), _localsmiddleware.onlyPrivate, _videoController.posteditVideo);
videoRouter.get(_routes["default"].deleteVideo(), _localsmiddleware.onlyPrivate, _videoController.deleteVideo);
var _default = videoRouter;
exports["default"] = _default;