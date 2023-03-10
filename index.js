import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mysql from "mysql";
// import {db} from "./db.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import postRoutes from "./routes/post.js";
import bidRoutes from "./routes/bid.js";
import trackRoutes from "./routes/track.js";
import userRoutes from "./routes/user.js";
import rateRoutes from "./routes/rate.js";
// import utilRoutes from "./routes/util.js";

dotenv.config(); //這樣才能讀.env檔案


// 讀取生成的swagger api doc 檔案
let swaggerDocument = JSON.parse(
  fs.readFileSync("./swagger_output.json", "utf-8"),
);

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json()); // 把req.body的內容轉換成json形式
app.use(cors()); // 允許CORS（不知道什麼是CORS的可以自己查）


app.use(
  "/api/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

app.use("/posts", postRoutes);
app.use("/bids", bidRoutes);
app.use("/tracks", trackRoutes);
app.use("/profile", userRoutes);
app.use("/rates", rateRoutes);
// app.use("/", utilRoutes);



app.get("/", (req, res) => {
  /* #swagger.description = '看server是否運作' */
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  return res.status(200).send("The server is running.");
});

// The server is now listeing
app.listen(port, () => {
  console.log("The server is running on port: " + port);
})

var db = mysql.createConnection({
  // connectTimeout  : 60 * 60 * 1000,
  // Change it to the public IP generated by ngrok
  host: "127.0.0.1",
  port: process.env.DB_PORT,
  user: "root",
  password: "123456",
  database: "ShopDB"
})

db.connect();
db.query("SHOW tables", function (err, result) {
  if (err) throw err;
  // console.log(result);
});
db.end();



