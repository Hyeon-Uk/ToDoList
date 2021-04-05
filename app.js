var express=require("express");
var app=express();
var bodyParser=require('body-parser');
var cors=require('cors');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.listen("8000",(req,res)=>{
    app.get('/',(req,res)=>{
        res.send("./public/index.html");
    });
});