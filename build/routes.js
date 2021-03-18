"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//Global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; // Users

var USERS = "/users";
var USER_DETAIL = "/:id"; // 다른사람 계정확인 용도

var EDIT_PROFILE = "/edit-profile";
var CHNAGE_PASSWORD = "/change-password";
var ME = "/me"; // Videos

var VIDEOS = "/videos";
var UPLOAD = "/upload";
var VIDEO_DETAIL = "/:id";
var EDIT_VIDEO = "/:id/edit";
var DELETE_VIDEO = "/:id/delete"; // Github

var GITHUB = "/auth/github";
var GITHUB_CALLBACK = "/auth/github/callback"; // API   server와 통신하기 위한 URL

var API = "/api"; // 어떤것도 render 할수 없음.

var REGISTER_VIEW = "/:id/view";
var ADD_COMMENT = "/:id/comment";
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHNAGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: function videoDetail(id) {
    if (id) {
      return "/videos/".concat(id);
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: function editVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/edit");
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: function deleteVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/delete");
    } else {
      return DELETE_VIDEO;
    }
  },
  gitHub: GITHUB,
  gitHubCallback: GITHUB_CALLBACK,
  me: ME,
  api: API,
  register: REGISTER_VIEW,
  addComment: ADD_COMMENT
};
var _default = routes;
exports["default"] = _default;