const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jsonwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const sendgridtransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')

const key = require('../key');
const { requireLogin } = require('../middleware/requirelogin');

var con = mysql.createConnection({
    host: "localhost",  
    user: "root",  
    password: "mysql1234",
    database: "banking"
})

con.connect(function(err){
    if(err){
        console.log(err)
    }
})
//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
const transporter = nodemailer.createTransport(sendgridtransport({
    auth:{
        api_key:'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' 
    }
}))

router.post('/signup',(req,res)=>{
    if(!req.body.username || !req.body.password || !req.body.name){
        return res.json({error:'Enter All The fields!'})
    }
    var checkuser = `select username from useraccounts where username=?;`
    var check = [[req.body.username]]
    var m = con.query(checkuser,[check])
    var sql = `insert into useraccounts values ?`
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            var values = [[Math.floor(Math.random() * 10000000000),req.body.name,req.body.username,hash,0,req.body.email,null,null,0]];
            con.query(sql,[values],function(err,result){
            if(err){
                return res.json({error:err})
            }else{
                crypto.randomBytes(32,(err,buffer)=>{
                    if(err){
                        return console.log(err)
                    }
                    const token = buffer.toString("hex")
                    con.query('select * from useraccounts where email=?',[req.body.email],function(err,ress){
                        if(err) throw err;
                        if(ress.length>0){
                            con.query('update useraccounts set resetToken=?,expireToken=? where email=?',[token,Date.now() + 3600000,req.body.email],function(err,resu){
                                if(err) throw err;
                                transporter.sendMail({
                                    to:req.body.email,
                                    from:'utkarshn.18.becs@acharya.ac.in',
                                    subject:"Big Bank - Big Bank Account Activation",
                                    html:`
                                    <h1>Bank activate for ${req.body.email}</h1>
                                    <h4>To activate your Big Bank account follow this <a href="http://localhost:3000/activate/${token}">link</a></h4>
                                    `
                                }).then(data=>
                                    res.json({
                                    data,
                                    message:'Check your Mail!',
                                    token:token
                                }))
                            })
                        }else{
                            return res.json({error:"This email is not registered!"})
                        }
                    })
                })
            }
        })
    });
});   
})

router.post('/resendEmail',(req,res)=>{
    const token = req.body.token
    transporter.sendMail({
        to:req.body.email,
        from:'utkarshn.18.becs@acharya.ac.in',
        subject:"Big Bank - Big Bank Account Activation",
        html:`
        <h1>Bank activate for ${req.body.email}</h1>
        <h4>To activate your Big Bank account follow this <a href="http://localhost:3000/activate/${token}">link</a></h4>
        `
    }).then(data=>
        res.json({
        data,
        message:'Check your Mail!',
        token:token
    }))
})

router.post('/login',(req,res)=>{
    if(!req.body.username || !req.body.password){
        return res.json({error:'Enter All The fields!'})
    }
    var values = [[req.body.username,req.body.password]]
    
    mm="SELECT * FROM useraccounts WHERE username = ?"
    con.query(mm,[req.body.username],function(err,result){
        if(err)throw err;
        if(result.length==0){
            return res.json({error:'Username and Password do not match!'})
        }else{
            const hash = result[0].password
            bcrypt.compare(req.body.password,hash)
                .then(success=>{
                    if(success){
                        const payload = {
                            acc: result[0].accnum,
                            name: result[0].name,
                            username: result[0].username
                        }
                        console.log(payload)
                        jsonwt.sign(
                            payload,
                            key.secret,
                            (err,token)=>{
                                if(err) throw err;
                                return res.json({
                                    success:true,
                                    token:'Bearer '+token
                                })
                            }
                        )
                        //res.json({message:"Access Granted!"})
                    }else{
                        res.json({error:"Email And Password do not match!"})
                    }
                })
            }
        })
    })

router.get('/user',requireLogin,(req,res)=>{
    return res.json(req.user)
})

router.get('/getresetToken',(req,res)=>{
    con.query('select resetToken from useraccounts where accnum=?',[req.user.accnum],function(err,result){

    })
    return res.json()
})

router.get("/signout",(req,res)=>{
    res.clearCookie("token");
    return res.json({
        message:"User signout successfully"
    })
})

module.exports = router


