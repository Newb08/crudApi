import dotenv from 'dotenv'
import express from 'express'
import {authorize} from './Middleware/authorize.js'
import {errHandler} from './Middleware/errorHandler.js'
import jsonRoutes from './Routes/jsonRoute.js'
import arrRoutes from './Routes/arrRoutes.js'

dotenv.config({path : '../.env'});
const app = express()
const PORT=process.env.PORT || 3000

const myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

app.use(myLogger)
app.use(express.json())
app.use('/jsnFile', authorize, jsonRoutes)
app.use('/arrFile', authorize, arrRoutes)


// app.get('/', (req,res)=>{
//     res.send(`<h1>Hello World!</h1>`)
// })
app.get('/', (req, res) => {
    throw new Error('BROKEN') // Express will catch this on its own.
  })

app.use(errHandler)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})