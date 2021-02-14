import express from "express";
import {
  deleteVideo,
  geteditVideo,
  getupload,
  posteditVideo,
  postupload,
  videoDetail,
} from "../controllers/videoController";
import { uploadVideo } from "../localsmiddleware";
import routes from "../routes";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, video);
videoRouter.get(routes.upload, getupload);
videoRouter.post(routes.upload,uploadVideo, postupload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), geteditVideo);
videoRouter.post(routes.editVideo(), posteditVideo);

videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
