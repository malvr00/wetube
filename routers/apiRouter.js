import express from "express";
import routes from "../routes";
import { postAddComment, postRegisterView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.register, postRegisterView); // database 변갱해야 해서 post 사용.
apiRouter.post(routes.addComment,postAddComment);
export default apiRouter;
