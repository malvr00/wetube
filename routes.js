//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users

const USERS = "/users";
const USER_DETAIL = "/:id";          // 다른사람 계정확인 용도
const EDIT_PROFILE = "/edit-profile";
const CHNAGE_PASSWORD = "/change-password";
const ME = "/me";
// Videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK= "/auth/github/callback";

// API   server와 통신하기 위한 URL
const API = "/api"; // 어떤것도 render 할수 없음.
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: (id) =>{
        if(id){
            return `/users/${id}`;
        } else{
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHNAGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: (id) => {
        if(id){
            return `/videos/${id}`;
        } else {
            return VIDEO_DETAIL;
        }
    },
    editVideo: (id) =>{
        if(id){
            return `/videos/${id}/edit`;
        } else{
            return EDIT_VIDEO;
        }
    },
    deleteVideo: (id) => {
        if(id){
            return `/videos/${id}/delete`;
        }else{
            return DELETE_VIDEO;
        }
    },
    gitHub:GITHUB,
    gitHubCallback:GITHUB_CALLBACK,
    me:ME,
    api:API,
    register:REGISTER_VIEW,
    addComment: ADD_COMMENT
};

export default routes;