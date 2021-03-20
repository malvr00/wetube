import passport from "passport";
import GithubStrategy from "passport-github";
import {
  githubLoginCallback,
} from "./controllers/userController";
import User from "./models/user";
import routes from "./routes";
// passport가 사용자 인증을 처리할 수 있도록 설정

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GIT_SECRET,
      callbackURL: process.env.PROUCTION ?  `https://rocky-chamber-06274.herokuapp.com/${routes.gitHubCallback}`:`http://localhost:4000${routes.gitHubCallback}`,
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser()); // 쿠키에는 user.id만 담아서 보내
passport.deserializeUser(User.deserializeUser());
