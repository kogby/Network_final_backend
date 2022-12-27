import mysql from "mysql"

export const getAllPosts = async (req, res) => {
  /* #swagger.tags = ['Posts']
  #swagger.description = 'Get all posts' */
  var query = `SELECT * FROM ITEM INNER JOIN POST ON post_title = item_post_title`;

  var db = mysql.createConnection({
    // Change it to the public IP generated by ngrok
    host: "127.0.0.1",
    port: process.env.DB_PORT,
    user: "root",
    password: "123456",
    database: "ShopDB",
    multipleStatements: true
  })
  db.connect();

  db.query(query, async (err, rows) => {
    if (err) throw err;
    console.log(rows)
    const allPosts = rows.map(async (row) => {
      return {
        postSeller: row.post_seller_name,
        postTitle: row.post_title,
        postContent: row.content,
        recommendedPrice: row.price, 
        postImg: row.image, 
      }
    })
    Promise.all(allPosts).then((results) => {
      console.log(results)
      return res.status(200).json({ posts: results });
    })
  });
  // db.end();
}