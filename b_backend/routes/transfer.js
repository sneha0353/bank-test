const express = require('express')
const router = express.Router()
const {requireLogin} = require('../middleware/requirelogin')
const mysql = require('mysql')
const { v4: uuidv4 } = require('uuid');

var con = mysql.createConnection({
    host: "localhost",  
    user: "root",  
    password: "mysql1234",
    database: "banking"
})

router.post('/transfer',requireLogin,(req,res)=>{
    if(!req.body.amount || !req.body.accnum){
        return res.json({error:'Enter the amount and Acc/no. to transfer!'})
    }

    var amount = req.body.amount
    var to = req.body.accnum

    var cqs='select accnum from useraccounts where accnum=?'
    var q = 'select balance from useraccounts where accnum=?'
    con.query(cqs,[req.body.accnum],function(err,result){
        if(err)throw err;
        if(result.length>0)
        {
        console.log(result)
        con.query(q,[req.user.accnum],function(err,result){
            if(err) throw err;
            console.log(result[0].amount)
            if(result[0].balance<amount){
                return res.json({error:"Insufficient funds to transfer!"})
            }
    
            var camount = 0
            camount = parseInt(result[0].balance)-parseInt(amount)
            var cq = 'update useraccounts set balance=? where accnum=?'
            con.query(cq,[camount,req.user.accnum],function(err,ress){
                if(err) throw err;
                console.log('Amount Credited!')
            })
            var tq = 'select * from useraccounts where accnum=?'
            con.query(tq,[to],function(err,resu){
                if(err) throw err;
                var tq = 'insert into transferhistory values ?'
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                today = yyyy + '/' + mm + '/' + dd;
                var nv = [[uuidv4(),req.user.accnum,resu[0].accnum,amount,today]]
                con.query(tq,[nv],function(err,results){
                    if(err) throw err;
                    console.log(results)
                })
                var damount = 0
                damount = parseInt(resu[0].balance) + parseInt(amount)
                var qq = 'update useraccounts set balance=? where accnum=?'
                con.query(qq,[damount,to],function(err,rr){
                    if(err) throw err;
                    console.log('Amount Debited!')
                    return res.json(rr)
                })
            })
        })
        }
        else{
            console.log("ad")
            return res.json({error:"Account doesn't exists!"})
        }
    })
})


module.exports = router