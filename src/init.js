import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";
dotenv.config();

import "./models/video";
import "./models/comment";
import "./models/user";

const PORT = process.env.PRODUCTION ? `http://localhost:${process.env.PORT}` : `https://rocky-chamber-06274.herokuapp.com/`;

const handleListening = () =>
  console.log(`✔ Listening on: ${PORT}`);

app.listen(PORT, handleListening);
