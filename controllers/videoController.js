import routes from "../routes";
import video from "../models/video";

export const home = async (req, res) => {
  try {
    const videos = await video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let Videos = [];
  try {
    Videos = await video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Searchs", searchingBy, Videos });
};

//export const video = (req, res) =>
// res.render("videos", { pageTitle: "Videos" });

export const getupload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postupload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  //console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const Video = await video.findById(id).populate("creator");
  //  console.log(Video); //populate 객체를 대려오는 함수 object ID type만 쓸 수 있음
    res.render("videoDetail", { pageTitle: Video.title, Video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const geteditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const Video = await video.findById(id); // 이 함수 이용하여 존재하지 않는 ID 적을 시 error 발생하여 catch 로 넘어감
    if (Video.creator != req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${Video.title}`, Video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const posteditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    try {
      const Video = await video.findById(id); // 이 함수 이용하여 존재하지 않는 ID 적을 시 error 발생하여 catch 로 넘어감
      if (Video.creator != req.user.id) {
        throw Error();
      } else {
        await video.findOneAndRemove({ _id: id });
      }
    } catch (error) {
      res.redirect(routes.home);
    }
  } catch (error) {}
  res.redirect(routes.home);
};
