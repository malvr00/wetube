import express from "express";
import {
  deleteVideo,
  geteditVideo,
  getupload,
  posteditVideo,
  postupload,
  videoDetail,
} from "../controllers/videoController";
import { onlyPrivate, uploadVideo } from "../localsmiddleware";
import routes from "../routes";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, video);
videoRouter.get(routes.upload, onlyPrivate, getupload);
videoRouter.post(routes.upload, onlyPrivate,uploadVideo, postupload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, geteditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, posteditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
