import express from "express";
import {
  deleteVideo,
  editVideo,
  getupload,
  postupload,
  videoDetail,
} from "../controllers/videoController";
import routes from "../routes";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, video);
videoRouter.get(routes.upload, getupload);
videoRouter.post(routes.upload, postupload);

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
