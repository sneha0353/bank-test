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

router.post("/loan",requireLogin,(req,res)=>{
    if(!req.body.l_amt || !req.body.l_start || !req.body.l_end){
        return res.json({err:'Enter All Fields!'})
    }
    else{
        var values = [uuidv4 (),req.user.accnum,req.body.l_amt,10,req.body.l_start,req.body.l_end]
        con.query('insert into loan values ?',[[values]],function(err,result){
            if(err)throw err;
            res.json(result)
        })
    }
})

module.exports = router;