const mysql = require ("mysql2")

// Create the connection to the database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Mj2012!!!',
    database: 'employees_db',
  },
  console.log(`Connected to the employees_db database.`)
  );

  connection.connect(function(err){
    if(err) throw err
  })

  module.exports=connection