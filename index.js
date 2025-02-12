import dotenv from 'dotenv'
import express from 'express'
import fs, { read, readFileSync } from 'fs'
import {authorize} from './Middleware/authorize.js'

dotenv.config();
const app = express()
const PORT=process.env.PORT || 3000
const filePath = './data.json';

const myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

const readData=(path)=>{
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
}
const writeData=(data)=>{
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.use(myLogger)
app.use(express.json())

app.get('/abcd', authorize, (req,res)=>{
    res.send("Hello")
})

app.get('/users', authorize, (req,res)=>{
    const users=readData(filePath)
    res.send(users)
})

app.post('/add-user', authorize, (req,res)=>{
    const users=readData(filePath)
    const newUser=req.body

    users.push(newUser)
    writeData(users)
    
    res.send('New user added')
})

app.patch('/user/:id', authorize, (req,res)=>{
    const users=readData(filePath)
    const userId=parseInt(req.params.id)
    const updates=req.body

    const user=users.find((user) => user.id === userId);
    if(!user){
        return res.send(`No user with id:${userId} exist`)
    }

    Object.assign(user,updates)
    writeData(users)

    res.send('User data updated')
})

app.delete('/user/:id', authorize, (req,res)=>{
    const users=readData(filePath)
    const userId=parseInt(req.params.id)

    const user=users.find((user) => user.id === userId);
    if(!user){
        return res.send(`No user with id:${userId} exist`)
    }

    users.splice(userId-1,1)
    writeData(users)

    res.send(`User data deleted\n${users}`)
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