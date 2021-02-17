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
  });
  console.log(newVideo);
  // To Do: Upload and save Video
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const Video = await video.findById(id);
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
    const Video = await video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${Video.title}`, Video });
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
    await video.findOneAndRemove({ _id: id });
  } catch (error) {}
  res.redirect(routes.home);
};
