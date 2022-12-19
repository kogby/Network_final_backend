import mysql from "mysql"

export const getPersonPosts = async (req, res) => {
  /* #swagger.tags = ['Posts']
  #swagger.description = 'Get one's posts' */
  var query = 'SELECT * FROM POST WHERE SELLER_NAME = ? ';

  var db = mysql.createConnection({
    // connectTimeout  : 60 * 60 * 1000,
    // Change it to the public IP generated by ngrok
    host: "127.0.0.1",
    port: process.env.DB_PORT,
    user: "root",
    password: "123456",
    database: "shoppingDB"
  })

  db.connect();
  db.query(query, [req.params.name], function (err, rows, fields) {
    if (err) throw err;
    console.log(query);
    return res.status(200).json(rows);
  });
  db.end();
}