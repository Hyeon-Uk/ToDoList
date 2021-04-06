const mysql=require('mysql');

const db=mysql.createConnection({
    host:'localhost',
    user:'todo_test@%',
    password:"todo",
    port:3307,
    database:"todo_list"   
});

db.connect();
module.exports = db;
