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

//github 유저 로그인 시키기
export const githubLogin = passport.authenticate("github");

//github 로그인 하면 콜백으로 유저 정보 가지고옴
export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) =>{
  const { _json:{id,avatar_url, name, email}} = profile;
  // 유저정보 가져오는데 성공시
  try{
    const user = await User.findOne({email:email});
    if(user){
      user.githubId = id; // github ID
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url
    });
    return cb(null,newUser);
  }catch(error){
    return cb(error)
  }
}
export const postGithubLogIn = (req, res) =>{
  res.redirect(routes.home);
}

export const logout = (req, res) =>{
  req.logout();
  res.redirect(routes.home)
}


//export const users = (req, res) => res.render("users", { pageTitle: "Users" });

export const me = (req, res) => {
  res.render("userDetail", { pageTitle: "UserDetail",user:req.user } );
}

export const userDetail = async (req, res) =>{
  const {params:{id}} = req;
  try{
    //console.log(id);                        // findById가 필터링해주므로 존재하는 ID만 사이트로 이동 가능.
    const user = await User.findById(id);     // findbyId찾을때 등록하지 않은 id이면 error 발생하여 catch가 대신 처리
    res.render("userDetail", { pageTitle: "UserDetail",user });
  } catch(error){
    // console.log("하하하하");
    res.redirect(routes.home);
  }
}
  
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EditProfile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });
