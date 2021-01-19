const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
//const passport=require("passport")

const PORT = 7000

// app.use(passport.initialize())
// require("./middleware/strategy")(passport)

const authRoutes = require('./routes/auth')
const withdrawalRoutes = require('./routes/withdrawal')
const transferRoutes = require('./routes/transfer')
const registerRoutes = require('./routes/register')
const testRoutes = require('./routes/robot')
const pinRoutes = require('./routes/pinreset')
const adminRoutes=require("./routes/admin")
const loanRoutes =require('./routes/loan')

app.get('/',(req,res)=>{
    res.send("Server Running")
})


var con = mysql.createConnection({
    host: "localhost",  
    user: "root",  
    password: "mysql1234",
    database: "banking"
})

con.connect(function(err){
    if(err){
        console.log(err)
    }else{
        console.log('CONNETED TO DB')
    }
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use('/api',authRoutes)
app.use('/api',withdrawalRoutes)
app.use('/api',transferRoutes)
app.use('/api',registerRoutes)
app.use('/api',testRoutes)
app.use('/api',pinRoutes)
app.use('/api',adminRoutes)
app.use('/api',loanRoutes)

app.listen(PORT,()=>{
    console.log(`App running at port ${PORT}`)
})