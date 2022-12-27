import mysql from "mysql"

export const getSearchPosts = async (req, res) => {
  /* #swagger.tags = ['Posts']
  #swagger.description = 'Search posts' */
  var query = 'SELECT * FROM ITEM INNER JOIN POST ON item_post_title = post_title WHERE post_title LIKE ? ';

  var db = mysql.createConnection({
    // Change it to the public IP generated by ngrok
    host: "127.0.0.1",
    port: process.env.DB_PORT,
    user: "root",
    password: "123456",
    database: "ShopDB"
  })

  db.connect();
  var string_ = '%' + req.params.title + '%'
  db.query(query, [string_], async (err, rows, fields) => {
    if (err) throw err;
    
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
  db.end();
}