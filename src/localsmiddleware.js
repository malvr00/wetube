import multer from "multer";
import multers3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
  accessKeyID: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-1" // 지역 설정
});
//경로 설정
const multerVideo = multer({
  //storage = 많은 설정 할수 있음 기본 default는 nodejs
  storage: multers3({
    s3,
    acl: "public-read",
    bucket: "wetube99/video",
  }),
});
const multerAvatar = multer({
  s3,
  acl: "public-read",
  bucket: "wetube99/avatar",
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const localsmiddleware = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
