import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config(); //這樣才能讀.env檔案


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // 把req.body的內容轉換成json形式
app.use(cors()); // 允許CORS（不知道什麼是CORS的可以自己查）



app.get("/", (req, res) => {
    console.log("Connected Successfully!")
    return res.status(200).send("The server is running.");
});

var db = mysql.createConnection({
  host: "0.tcp.jp.ngrok.io",
  port: "11377",
  user: "root",
  password: "123456",
  database: "shoppingDB"
})

db.connect(function(err) {
  if (err) throw err;
  db.query("SHOW tables", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  console.log("MySQL connected. ")
})

// The server is now listeing
app.listen(port, ()=>{
  console.log("Ther server is running on port: " + port);
})
