const {requireLogin}=require("./requirelogin")
const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",  
    user: "root",  
    password: "mysql1234",
    database: "banking"
})
const accountSid = "ACf2acac811cb8dda8c64ac6172583322c";
const authToken = "ea8583ec0fd8cb120cb326bf00368a76";
const client = require('twilio')(accountSid, authToken);

var sid
var accnum

exports.test=(req,res,next)=>{
       requireLogin(req,res,function(){ 
        accnum = req.user.accnum
        console.log(accnum)
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
                        next()
                        });
                    });
            }) 
    })
}

exports.check = (req,res,next) => {
    con.query('select mobile from profile where accnum=?',[accnum],function(err,result){
        if(err) throw err;
        client.verify.services(sid)
        .verificationChecks
        .create({to: '+91'+String(result[0].mobile), code: req.body.otp})
        .then(verification_check => {
            res.json({status:verification_check.status})
            next()
        });
    })
}

