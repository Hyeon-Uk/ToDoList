const express=require("express");
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql');
const path=require('path');
//const db=require('./lib/db');

const db=mysql.createConnection({
    host:'localhost',
    user:'todo_test@%',
    password:"todo",
    port:3307,
    database:"todo_list"   
});

db.connect();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.listen("8000",()=>{
});

app.post('/add',(req,res)=>{
    const table=req.body.table;
    const user_name=req.body.user_name;
    const topic=req.body.topic;
    db.query(`insert into ${table}(user_name,topic) values(?,?)`,[user_name,topic],(err)=>{
        if(err) throw err;
    });
})

app.post('/gettodo',(req,res)=>{
    const data=req.body.user_name;
    db.query('select topic from todolist where user_name=? ',[data],(err,result)=>{
        if(err) throw err;
        res.json(result);
    });
})

app.post('/getfinished',(req,res)=>{
    const data=req.body.user_name;
    db.query('select topic from finishedlist where user_name=?',[data],(err,result)=>{
        if(err) throw err;
        res.json(result);
    });
})

app.post('/delete',(req,res)=>{
    const table=req.body.table;
    const user_name=req.body.user_name;
    const topic=req.body.topic;
    console.log(table,topic);
    db.query(`delete from ${table} where topic=? and user_name=?`,[topic,user_name],(err)=>{
        if(err) throw err;
    });
})
// app.get('/db',(req,res)=>{
//     db.query("select * from todolist",(err,results)=>{
//         if(err) throw err;
//         else{
//             console.log(results);
//             res.send("hello world");
//         }
//     })
// })
