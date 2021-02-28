import express from "express";
import passport from "passport";
import {
  getJoin,
  postJoin,
  logout,
  getlogin,
  postlogin,
  githubLogin,
  postGithubLogIn,
  me
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPublic } from "../localsmiddleware";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postlogin);

globalRouter.get(routes.login, onlyPublic, getlogin);
globalRouter.post(routes.login, onlyPublic, postlogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(
  routes.gitHubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
);

globalRouter.get(routes.me, me);


export default globalRouter;
