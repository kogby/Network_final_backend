export const getPersonPosts  = async (req, res) =>{
  /* #swagger.tags = ['Posts']
  #swagger.description = 'Get all posts' */
  var query ='SELECT * FROM POST';

  db.connect(function(err) {
    if(err) throw err;
    db.query(query, function(err, rows, fields){
        if(err) throw err;
        // res.render('index', { title: '這是 mysql + node.js 示範版本', 'items': rows });   
        return res.status(200).json(rows);
    });
  })
  console.log('getallpost')
}