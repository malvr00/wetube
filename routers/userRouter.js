import express from "express";
import {userDetail, editProfile, changePassword } from "../controllers/userController";
import { onlyPrivate } from "../localsmiddleware";
import routes from "../routes";

const userRouter = express.Router();

//userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;