const express = require('express')
const router = express.Router()
const {requireLogin} = require('../middleware/requirelogin')
const mysql = require('mysql')
const { v4: uuidv4 } = require('uuid');
//const { route } = require('./register');

var con = mysql.createConnection({
    host: "localhost",  
    user: "root",  
    password: "mysql1234",
    database: "banking"
})

router.post('/activate-card',requireLogin,(req,res)=>{
    if(!(req.body.card_number && req.body.valid && req.user.accnum)){
        res.json({message:"enter all details"})
    }
    else{
        q="insert into pin values ?"
        vals=[[uuidv4(),req.body.card_number,req.body.valid,Math.floor(Math.random() * 10000),req.user.accnum,0]]
        con.query(q,[vals],function(err,result){
              if(err)throw err;
              res.json(result)
        })
    }
})

router.get("/show-pin",requireLogin,(req,res)=>{
    var m="select flag from pin where accnum = ?"
    con.query(m,[req.user.accnum],function(err,result){
        if(err) throw err;
        if(result[0].flag==1){
            return res.json("Pin cannot Be shown!")
        }
        else if(result[0].flag==0){
            var q="select pin,flag from pin where accnum = ?"
            con.query(q,[req.user.accnum],function(err,ress){
                if(err)throw err;
                res.json(ress)
            })
        }
    })
    
})

router.post("/pingenerate",requireLogin,(req,res)=>{
    var q="select pin from pin where accnum = ?"
    con.query(q,[req.user.accnum],function(err,result){
        if(err)throw err;
        if(result.length > 0)
        {
            console.log(req.body.oldpin,result[0].pin)
            if(!(req.body.card_number && req.body.valid && req.user.accnum && req.body.oldpin && req.body.newpin && req.body.cpin)){
                res.json({message:"enter all details for pin change"})
            }
            else if(req.body.newpin!=req.body.cpin)
            {
                return res.json({err:"did not match"})
            }
            
            else if(req.body.oldpin != result[0].pin){
                return res.json({err:"Old pin doesn't match!"})
            }
            else{
                qm='select flag from pin where accnum=?'
                con.query(qm,[req.user.accnum],function(err,result){
                    if(err)throw err
                    if(result[0].flag==0)
                    {
                        p='update pin set pin=?,flag=? where accnum=?'
                        con.query(p,[req.body.cpin,1,req.user.accnum],function(err,ress){
                            console.log(ress)
                            if(err)throw err;
                            res.json(ress)
                        })
                    }
                    else{
                        res.json({message:"contact ur branch!"})
                    }
                })  
            }
        }
        else{
         res.json({err:"fields unmatched"})
        }
    })
})

module.exports=router