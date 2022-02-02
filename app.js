const express = require('express')
const morgan = require('morgan')
const createError = require("http-errors")
require('dotenv').config()
require('./helpers/init_mongodb')
const { verifyAccessToken } = require('./helpers/jwt_helper')
const AuthRoute = require('./Routes/Auth.route')
const { status } = require('express/lib/response')
const {authPage, authinfo} = require('./helpers/middleware')
 

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',verifyAccessToken,async(req, res, next) => {
    console.log(req.headers['authorization'])
    res.send("Hello World!")
})

app.get("/userinfo",verifyAccessToken,authPage(["admin"]),async(req,res,next) => {
    res.json({
        pedro: 100,
        jack: 45,
        rushi: 400
    });
    
});

app.post("/userinfo2",verifyAccessToken,authPage(["admin"]),async(req,res,next) => {
    res.json({
        pedro: 100,
        jack: 45,
        rushi: 400
    });
    
});




app.use('/auth', AuthRoute) //go to auth.route.js in Routes

app.use(async(req, res, next) => {

    next(createError.NotFound())
}) 

app.use((err,req,res,next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        },
    })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server running on '+ PORT )
})