var express = require("express");
var app = new express();
var fs = require("fs");
var mysql = require("mysql");
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extends : false});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")
    next();
});

var conString = {
    server:"localhost",
    database:"node",
    user:"root",
    password:""
}
con = mysql.createConnection(conString);

con.connect();

app.get("/get-user",function(req,res){
//    con.connect(function(err){
//        if(err){
//            res.send("Could not connect to server : "+err);
//        }else{
//            con.query("select * from users",function(err, rows,fields){
//                res.send(rows);
//            });
//            
//        }
//    });
//    con.end();

    con.query('select * from users', function(err, rows, fields) {
        if (!err){
          res.send(rows);
        }else{
          console.log('Error while performing Query. : '+err);
        }
    });

});

app.delete("/delete",function(req,res){
    
    if( typeof req.query.id !== 'undefined' && req.query.id != null){
        var userid = req.query.id;
        var sql = "DELETE FROM users WHERE id=?";
        con.query(sql,userid,function(err,rows,fields){
            if(!err){
                res.send(JSON.stringify({success:true}));
            }else{
                res.send(JSON.stringify({success:false}));
                console.log('Error while performing Query. : '+err);
            }
        });
    }else{
        res.send(JSON.stringify({success:false,msg:'user id not found'}));
    }
});

app.delete("/delete-selected",function(req,res){
   if( typeof req.query.user_list != 'undefined' && req.query.user_list != ""){
       var userList = req.query.user_list.toString();
       console.log(userList);
//       var sql = "DELETE FROM users WHERE id IN ( ? )";
//       con.query(sql,userList,function(err,rows,fields){
       var sql = "DELETE FROM users WHERE id IN ( "+userList+" )";
       con.query(sql,function(err,rows,fields){
           if(!err){
               res.send(JSON.stringify({success:true}));
           }else{
               res.send(JSON.stringify({success:false}));
               console.log('Error while performing Query. : '+err);
           }
       });
   }else{
       res.send(JSON.stringify({success:false,msg:'user id not found'}));
   } 
});

/*
 * @author : Nitin Kumar
 * Date : 21 July 2017
 * Description : Save user in database
 */
app.post("/save",function(req,res){
    console.log(req.body);
    res.end("ok");
});

app.listen("2020");