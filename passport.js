import passport from "passport";
import User from "./models/user";

// passport가 사용자 인증을 처리할 수 있도록 설정

passport.use(User.createsStrategy());

passport.serializeUser(User.serializeUser());    // 쿠키에는 user.id만 담아서 보내
passport.deserializeUser(User.deserializeUser());