import passport from "passport"
import routes from "../routes";
import User from "../models/user";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password != password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try{
      const user = await User ({
        name,
        email
      });
      //만든계정과 비밀번호 등록
      await User.register(user, password); // 주어진 암호로 새 사용자 인스턴스를 등록하는 편리한 방법입니다.
      next();
    }catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
    //To Do: Log user in
  }
};

export const getlogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
};

export const postlogin = passport.authenticate("local",{
  failureRedirect: routes.login,
  successRedirect: routes.home
})  // local은 우리가 설치해준 Strategy 이름, failure는 로그인 실패하면 가는곳, success 성공하면
  

export const logout = (req, res) =>{
  // To Do: Process Log Out
  res.redirect(routes.home)
}


//export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "UserDetail" });
  
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EditProfile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });
