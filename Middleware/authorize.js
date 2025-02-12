// import express from 'express'
import dotenv from 'dotenv'

dotenv.config();
const authKey=process.env.KEY

export const authorize=(req,res,next)=>{
    // console.log(req.headers)
    const userKey=req.headers['secretkey'];
    
    if(!userKey){
        return res.status(401).send('Authorization Failed, No key found')
    }

    if(userKey !== authKey){
        return res.status(403).send('Authorization Failed, Invalid key')
    }
    
    next()
}