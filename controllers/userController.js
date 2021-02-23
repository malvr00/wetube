import routes from "../routes";
import User from "../models/user";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
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
    }catch (error) {
      console.log(error);
    }
    //To Do: Log user in
    res.redirect(routes.home);
  }
};

export const getlogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
};

export const postlogin = (req, res) =>{
    res.redirect(routes.home);
};


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
