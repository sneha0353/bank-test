const jwt = require('jsonwebtoken')
const {secret} = require('../key')
const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",  
    user: "root",  
    password: "mysql1234",
    database: "banking"
})

exports.requireLogin= (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        res.status(404).json({message:'U need to login first!'})
    }
    const token = authorization.replace('Bearer ',"")
    jwt.verify(token,secret,(err,payload)=>{
        if(err){
            return res.status(401).json({error:'U must be logged in!'})
        }
        const {username} = payload
        con.query('select * from useraccounts where username=?',[username],function(err,res){
            if(err) throw err;
            req.user = res[0]
            next()
        })
        
    })
}

