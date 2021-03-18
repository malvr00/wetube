import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";
dotenv.config();

import "./models/video";
import "./models/comment";
import "./models/user";

const PORT = process.env.PORT;

const handleListening = () =>
  console.log(`✔ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
