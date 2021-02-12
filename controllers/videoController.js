import {videos} from "../db"
import routes from "../routes"

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};

export const search = (req, res) => {
    const {query: {term: searchingBy}} = req;
    res.render("search", { pageTitle: "Searchs", searchingBy, videos });
};

//export const video = (req, res) =>
 // res.render("videos", { pageTitle: "Videos" });

export const getupload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postupload = (req, res) => {
  const {
    body: {file, title, description}
  } = req;
  // To Do: Upload and save Video
  res.redirect(routes.videoDetail(324393));
}

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "VideoDetail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "EditVideo" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "DeleteVideo" });