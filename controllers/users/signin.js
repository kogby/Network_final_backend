import mysql from "mysql"

export const signin = async (req, res) => {
  /* #swagger.tags = ['Users']
  #swagger.description = 'Get user's data' */
  var query = `
  SELECT account, phone_num, password, role FROM USER WHERE user_name = ? `;

  var db = mysql.createConnection({
    host: "127.0.0.1",
    port: process.env.DB_PORT,
    user: "root",
    password: "123456",
    database: "ShopDB",
    multipleStatements: true
  })
  db.connect();
  
  db.query(query, [req.params.myName], (err, rows) => {
    if (err) throw err;
    console.log(rows)
    if(rows[0]){
      return res.status(200).json({profile: rows[0] ,message: "success"});
    }
    else{
      return res.status(200).json({profile: rows[0], message: "fail"});
    }
    })
  // db.end();
}