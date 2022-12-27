import mysql from "mysql"

export const addTrack = async (req, res) => {
    const name  = req.body.myName
    const post_title = req.body.title
    /* #swagger.tags = ['Tracks']
    #swagger.description = 'Add a track ㄔㄟ an item' */
    var query = `INSERT INTO TRACK (track_item_id, track_user_name) VALUES ( ? , ?);`;
    var query_2 = `SELECT * FROM ITEM JOIN POST ON item_post_title = post_title WHERE post_title = ?`

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

    db.query(query_2, [post_title], (err, rows)=>{
      if (err) throw err;
      // console.log(rows);
      db.query(query, [rows[0].item_id.toString(), name], (err, rows_b) => {
        if (err) throw err
        // console.log(`SQL query: ${query}`)
        return res.status(200).json({message: "success!"});
      });    
    })

    // db.end();
}