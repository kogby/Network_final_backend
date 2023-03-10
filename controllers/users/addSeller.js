import mysql from "mysql"

export const addSeller = async (req, res) => {
    const name  = req.body.myName
    const phone_num = req.body.MyProfile.phone_num
    const account = req.body.MyProfile.account
    const password = req.body.MyProfile.password
    const real_name = req.body.realName
    const address = req.body.address

    /* #swagger.tags = ['Users']
    #swagger.description = 'Become a seller and add information' */
    var query = `
    INSERT INTO SELLER (seller_name, real_name, phone_num, account, password, address) VALUES (? ,? ,? ,? ,? ,?);
    UPDATE USER SET role = 'seller' WHERE user_name = ? ;
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

    db.query(query, [name, real_name, phone_num, account, password, address, name], (err, rows) => {
      if (err) throw err
      // console.log(`SQL query: ${query}`)
      const data = {
        phone_num : phone_num,
        account : account,
        password : password,
        role : 'seller'
      }
      return res.status(200).json({profile: data});
    });   
    // db.end();
}