import "core-js";
import express from "express";
const morgan = require("morgan");
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import path from "path"; // 추가
const MongoStore = require("connect-mongo").default;
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import { localsmiddleware } from "./localsmiddleware";
import "./passport";

const app = express();

app.set("view engine", "pug");
app.set("views",path.join(__dirname,"views"));
app.use(helmet());
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'unsafe-eval' 'self' https://archive.org"
  );
  return next();
});
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static(path.join(__dirname,"static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
   // store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
  })
);
//passport가 스스로 쿠키를 찾아 쿠키에 해당하는 사용자 찾음
app.use(passport.initialize()); // passport 초기화
app.use(passport.session()); // 자기가 찾은 사용자를 요청(req)로 만들어줌

app.use(localsmiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);
//app.use("/user", userRouter);

export default app;
