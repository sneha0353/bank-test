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

router.post("/register",requireLogin,(req,res)=>{
    var m="select pid from profile where accnum = ?"
    con.query(m,[req.user.accnum],function(err,ress){
        if(err)throw err
        if(ress.length==0)
        {
            if(!(req.body.firstname && req.body.pin && req.body.address && req.body.city && req.body.state && req.body.gender && req.body.accnt_type && req.body.mobile && req.body.sec_q && req.body.sec_a))
            {
                res.json({err:"please enter all fields"})
            } 
            else
            {
            var val=[[Math.floor(Math.random() * 1000000),req.body.firstname,req.body.lastname,req.body.pin,req.body.address,req.user.accnum,req.body.accnt_type,req.body.gender,req.body.mobile,req.body.sec_q,req.body.sec_a,req.body.city,req.body.state,req.body.country,req.body.dob]]
            var q="insert into profile values ?"
            con.query(q,[val],function(err,result){
                if(err)throw err;
                res.json(result)
             })
            }
        }
        else
        {
            res.json({message:"already submitted"})
        }
    })
})

router.put("/editform",requireLogin,(req,res)=>{
    var q="select pid from profile where accnum = ?"
    con.query(q,[req.user.accnum],function(err,result){
        if(err)throw err
        m1=result[0].pid
        var m="update profile set firstname=?,lastname=?,pin=?,address=?,accnt_type=?,gender=?,mobile=?,sec_q=?,sec_a=?,city=?,state=?,country=? where pid=?"
        if(req.body.firstname && req.body.pin && req.body.address && req.body.city && req.body.state && req.body.gender && req.body.accnt_type && req.body.mobile && req.body.sec_q && req.body.sec_a)
        {
            //var val=[[m1,req.body.firstname,req.body.lastname,req.body.pin,req.body.address,req.body.accnt_type,req.body.gender,req.body.mobile,req.body.sec_q,req.body.sec_a,req.body.city,req.body.state,req.body.country,m1]] 
            con.query(m,[req.body.firstname,req.body.lastname,parseInt(req.body.pin),req.body.address,req.body.accnt_type,req.body.gender,parseInt(req.body.mobile),req.body.sec_q,req.body.sec_a,req.body.city,req.body.state,req.body.country,m1],function(err,ress){
                if(err)throw err;
                return res.json(ress)
            })
        }
        else{
            res.json({message:"missing"})
        }
    })
})

router.get('/profile',requireLogin,(req,res)=>{
    con.query('select * from profile where accnum=?',[req.user.accnum],function(err,result){
        if(err) throw err;
        res.json(result)
    })
})

router.get('/accounts',requireLogin,(req,res)=>{
    con.query('select * from useraccounts where email=?',[req.user.email],function(err,result){
        if(err) throw err;
        res.json(result)
    })
})

module.exports = router