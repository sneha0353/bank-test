const express = require('express')
const router = express.Router()
const {requireLogin} = require('../middleware/requirelogin')
const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",  
    user: "root",  
    password: "mysql1234",
    database: "banking"
})

router.get("/get-all-customerlist",requireLogin,(req,res)=>{
    if(req.user.role===1)
    {
    con.query("select * from customer",function(err,ress){
        if(err)throw err;
        res.json(ress)
    })
   }
   else{
       res.json({err:"unauthorized"})
   }
})

router.post("/search-users",requireLogin,(req,res)=>{
    if(!req.body.input){
        return res.json({err:'No match'})
    }
    else{
    q="select * from CUSTOMER where firstname like ? or lastname like ? or address like ? or mobile like ? or accnum like ? or email like ? or balance like ?"
    con.query(q,[req.body.input+"%",req.body.input+"%",req.body.input+"%",req.body.input+"%",req.body.input+"%",req.body.input+"%",req.body.input+"%"],function(err,ress){
        if(err)throw err;
        res.json(ress)
    })
}
})

router.post("/is-admin",requireLogin,(req,res)=>{
    if(req.user.role===0){
        return res.json({err:"You are not Admin!"})
    }else{
        return res.json({success:true})
    }
})

module.exports=router