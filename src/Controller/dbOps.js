import fs from 'fs'
import dbPromise from '../db.js';

const createUser=async (req,res)=>{
    try {
        const db= await dbPromise
        const {name, age} = req.body
        await db.run('insert into users(name, age) values (?, ?)', [name, age])

        res.status(201).send(`New user added`)
    } 
    catch (error) {
        res.status(500).send(`User can't be added`)
        console.log(`Error from dbOps.js file `,error)
    }
    
}

const readUser= async(req,res)=>{
    try{
        const db= await dbPromise
        const users = await db.all('select * from users')
        res.send(users)
    }
    catch(error){
        res.status(500).send(`Can't fetch user details`)
        console.log(`Error from dbOps.js file `,error)
    }
}

const updateUser=async (req,res)=>{
    try {
        const db= await dbPromise
        const userId=parseInt(req.params.id)
        const {name, age} = req.body
        const result= await db.run('update users set name=?, age=? where id=?', [name, age, userId])

        if(result.changes === 0){
            return res.status(404).send(`User not found`)
        }

        res.status(200).send(`User details updated`)
    } 
    catch (error) {
        res.status(500).send(`User can't be updated`)
        console.log(`Error from dbOps.js file `,error)
    }
}

const deleteUser=async (req,res)=>{
    try {
        const db= await dbPromise
        const userId=parseInt(req.params.id)
        const result=await db.run('delete from users where id=?', [userId])

        if(result.changes === 0){
            return res.status(404).send(`User not found`)
        }

        res.status(200).send(`User deleted`)
    } 
    catch (error) {
        res.status(500).send(`User can't be deleted`)
        console.log(`Error from dbOps.js file `,error)
    }
}

export { createUser, readUser, updateUser, deleteUser };