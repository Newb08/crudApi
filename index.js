import dotenv from 'dotenv'
import express from 'express'

dotenv.config();
const app = express()

const PORT=process.env.PORT || 3000
const authKey=process.env.KEY

const myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

const authorize=(req,res,next)=>{
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
 
// app.use(authorize)
app.use(myLogger)

app.get('/abcd', authorize, (req,res)=>{
    res.send("Hello")
})

app.get('/', (req,res)=>{
    res.send(`<h1>Hello World!</h1>`)
})

// app.get('/error',(req, res,next)=>{
//     next(new Error("Test error."))
// })

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})