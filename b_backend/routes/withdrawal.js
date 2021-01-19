const express = require('express')
const router = express.Router()
const {requireLogin} = require('../middleware/requirelogin')
const {test,check}=require("../middleware/strategy")
const mysql = require('mysql')
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const accountSid = "ACf2acac811cb8dda8c64ac6172583322c";
const authToken = "ea8583ec0fd8cb120cb326bf00368a76";

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

var con = mysql.createConnection({
    host: "localhost",  
    user: "root",  
    password: "mysql1234",
    database: "banking"
})


router.put('/deposit',requireLogin,(req,res)=>{
    if(!req.body.deposit){
        return res.json({error:'Enter the amount to be deposited!'})
    }
    const amount = req.body.deposit
    var qq = 'select balance from useraccounts where accnum=?'
    con.query(qq,[req.user.accnum],function(err,result){
        if(err) throw err;
        var famount = 0
        famount = parseInt(amount) + parseInt(result[0].balance)
        var q = 'update useraccounts set balance=? where accnum=?'
        con.query(q,[famount,req.user.accnum],function(err,resu){
            if(err) throw err;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = yyyy + '/' + mm + '/' + dd;
            var values = [[uuidv4(),req.user.username,req.user.accnum,amount,today]]
            var dq = 'insert into deposithistory values ?'
            con.query(dq,[values],function(err,ress){
                if(err) throw err;
                console.log('Deposit History Updated!')
            })

            return res.json(resu)
        })
    })
})

router.put('/withdraw',requireLogin,(req,res)=>{
    if(!req.body.withdraw){
        return res.json({error:'Enter the amount to be Withdrawn!'})
    }
    const amount = req.body.withdraw
    var q = 'select balance from useraccounts where accnum=?'
    con.query(q,[req.user.accnum],function(err,result){
        if(err) throw err;
        if(result[0].balance < amount){
            return res.json({error:'Insufficient Funds!'})
        }else{
            console.log("kelld")
            var famount = 0
            famount = parseInt(result[0].balance) - parseInt(amount)
            console.log(famount);
            var qq = 'update useraccounts set balance=? where accnum=?'
            con.query(qq,[famount,req.user.accnum],function(err,resu){
                if(err) throw err;
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                today = yyyy + '/' + mm + '/' + dd;
                var wq = 'insert into withdrawhistory values ?'
                var values = [[uuidv4(),req.user.username,req.user.accnum,amount,today]]
                con.query(wq,[values],function(err,ress){
                    if(err)throw err;
                    console.log('Withdraw history updated!')
                })
                return res.json({message:resu})
            })
        }
    })
})


var sid
router.post('/otp',requireLogin,(req,res)=>{
    con.query('select mobile from profile where accnum=?',[req.user.accnum],function(err,result){
        if(err) throw err;
        console.log(result[0].mobile)
        client.verify.services.create({friendlyName: 'My First Verify Service'})
            .then(service => {
                sid=service.sid
                client.verify.services(sid)
                .verifications
                .create({to: '+91'+String(result[0].mobile), channel: 'sms'})
                .then(verification => {
                    res.json({status:verification.status})
                    });
                });
            })   
        })

router.post('/checkotp',requireLogin,check,(req,res)=>{
    console.log("yesss")
})

router.post("/tester",test,(req,res)=>{
    console.log(req.user)
    console.log(req.status)
})

router.get('/getwithdrawhistory',requireLogin,(req,res)=>{
    q='select * from withdrawhistory where accnum=? order by date desc'
    con.query(q,[req.user.accnum],function(err,result){
        // if(result.length>5)
        // {
        //    for(i=0;i<5;i++)
        //    {
        //        arr.push(result[i])
        //    }
        // }
        // return res.json(arr)
        if(err) throw err;
        return res.json({result:result})
    })
})

router.get('/getdeposithistory',requireLogin,(req,res)=>{
    q='select * from deposithistory where accnum=? order by date desc'
    con.query(q,[req.user.accnum],function(err,result){
        // if(result.length>5)
        // {
        //    for(i=0;i<5;i++)
        //    {
        //        arr.push(result[i])
        //    }
        // }
        // return res.json(arr)
        if(err) throw err;
        return res.json({result:result})
    })
})

router.post('/getdepositdate',requireLogin,(req,res)=>{
    if(!req.body.startdate || !req.body.enddate)
    {
        return res.json({err:"enter the start end date"})
    }
    q='select * from deposithistory where date between ? and ? and accnum=? order by date desc'
    con.query(q,[req.body.startdate,req.body.enddate,req.user.accnum],function(err,result){
        if(err) throw err;
        return res.json(result)
    })
})

router.post('/getwithdrawdate',requireLogin,(req,res)=>{
    if(!req.body.startdate || !req.body.enddate)
    {
        return res.json({err:"enter the start end date"})
    }
    q='select * from withdrawhistory where date between ? and ? and accnum=? order by date desc'
    con.query(q,[req.body.startdate,req.body.enddate,req.user.accnum],function(err,result){
        if(err) throw err;
        return res.json(result)
    })
})

router.get('/gettransferhistory',requireLogin,(req,res)=>{
    q='select * from transferhistory where from_acc=? order by date desc'
    con.query(q,[req.user.accnum],function(err,result){
        if(err)throw err;
        // console.log(result.length)
        // if(result.length>5)
        // {
        //    for(i=0;i<5;i++)
        //    {
        //        arr.push(result[i])
        //    }
        // }
        // return res.json(arr)
        return res.json({result:result})
    })
})

router.get("/gettransferdate",requireLogin,(req,res)=>{
    if(!req.body.startdate || !req.body.enddate)
    {
        return res.json({err:"enter the start end date"})
    }
    q='select * from transferhistory where date between ? and ? and from_acc=?'
    con.query(q,[req.body.startdate,req.body.enddate,req.user.accnum],function(err,ress){
      if(err)throw err
      res.json(ress)
    })
})

module.exports = router