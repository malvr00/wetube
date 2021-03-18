import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// passport-local-mongoose 사용 할거라 password 따로 db 만들어 놓치 않음.
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  faceboockId: Number,
  githubId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" }); // 필드명시, 사용자이름과 패스워드 이용한 인증
                                                                      // email이 될 수 있고 ID가 될수 있음.
const model = mongoose.model("User", UserSchema);

export default model;
