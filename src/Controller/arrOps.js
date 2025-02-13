import {getUsers, addUser, delUser} from '../Models/arrData.js'


const createUser=(req,res)=>{
    try {
        const users=getUsers()
        const newUser=req.body
        addUser(newUser)
        res.send('New user created!')
    } catch (error) {
        res.status(500).send(`User can't be added`)
        console.log(`Error from arrOps.js file `,error)
    }
    
}
const readUser=(req,res)=>{
    try {
        const users=getUsers()
        res.send(users)
    } catch (error) {
        res.status(500).send(`Can't fetch user details`)
        console.log(`Error from arrOps.js file `,error)
    }
    
}
const updateUser=(req,res)=>{
    try {
        const users=getUsers()
        const userId=parseInt(req.params.id)
        const updates=req.body

        const user=users.find((user)=>user.id==userId)
        if(!user){
            return res.status(404).send(`User Not Found`)
        }

        Object.assign(user, updates)

        res.send('User updated!')
    } catch (error) {
        res.status(500).send(`User can't be updated`)
        console.log(`Error from arrOps.js file `,error)
    }
    
}
const deleteUser=(req,res)=>{
    try {
        const users=getUsers()
        const userId=parseInt(req.params.id)

        const userIndex=users.findIndex((user)=>user.id==userId)
        if(userIndex === -1){
            return res.status(404).send(`User Not Found`)
        }

        delUser(userIndex)

        res.send('User deleted!')
    } catch (error) {
        res.status(500).send(`User can't be deleted`)
        console.log(`Error from arrOps.js file `,error)
    }
    
}

export {createUser, readUser, updateUser, deleteUser}