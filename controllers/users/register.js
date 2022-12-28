import mysql from "mysql"

export const addUser = async (req, res) => {
    const name  = req.body.name
    const phone_num = req.body.phoneNum
    const account = req.body.account
    const password = req.body.password

    /* #swagger.tags = ['Users']
    #swagger.description = 'Become a seller and add information' */
    var query = `
    INSERT INTO USER (user_name, phone_num, account, password, role) VALUES (? ,? ,? ,?, 'normal');
    `;

    var db = mysql.createConnection({
        // Change it to the public IP generated by ngrok
        host: "127.0.0.1",
        port: process.env.DB_PORT,
        user: "root",
        password: "123456",
        database: "ShopDB",
        multipleStatements: true
    })

    db.query(query, [name ,phone_num, account, password,name], (err, rows) => {
      if (err) throw err
      // console.log(`SQL query: ${query}`)
      return res.status(200).json({message: "success"});
    });   
    // db.end();
}