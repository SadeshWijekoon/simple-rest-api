const express = require('express');
const jwt =require('jsonwebtoken');

const app =express()

const verifyToken=(req,res,next)=>{ // check this before reasching to the router 
    const bearerHeader = req.headers['authorization'] // this is send by the client and it's look likes Bearer <token>
    if (typeof bearerHeader !== 'undefined'){
     const bearerToken=bearerHeader.split(' ')[1]
     console.log('Bearer Token:', bearerToken);
     req.token = bearerToken
     next() // this let to acsses the protected route if the token is right
    }else{
      res.sendStatus(403)
    }
 }

app.get('/api',(req,res)=>{ // public route
    res.json(
        {
            message:'Hey There',
        }
    )
})

app.post('/api/posts',verifyToken,(req,res)=>{ // procted route
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if (err){
            res.sendStatus(403)
        }else {
            res.json({
                message:'Post Created',
                authData
            })
        }
    })  
})

app.post('/api/login',(req,res)=>{
    const user = {
        id:1,
        username:"John",
        email:"John@gmail.com"
    }

    jwt.sign({user:user},'secretkey',(err,token)=>{ // if somathing goes eron get the err
        if (err){
            res.sendStatus(500)
        }else{
            res.json({token})
        }
    })
})



app.listen(3000,()=>{
    console.log('server is runnig');
    
})
