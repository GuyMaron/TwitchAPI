require('dotenv').config()
const express=require('express')
const app=express();
const cors = require('cors');
const twitchRouter=require('./routers/twitchApi.js');
const addRouter=require('./routers/add.js');



app.use(cors())

app.use(express.json({ limit: '1000kb' }));


app.use(express. json());


app.use('/add',addRouter)

app.use('/twitchApi',twitchRouter);

app.use((err,req,res,next)=> {
    const statusCode=err.statusCode || 500
    res.status(statusCode).json({
        status: statusCode,
        message: err.message
    })


})

app.listen(5000);
