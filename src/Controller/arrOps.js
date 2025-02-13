import {getUsers, addUser, delUser} from '../Models/arrData.js'


const createUser=(req,res)=>{
    const users=getUsers()
    const newUser=req.body
    addUser(newUser)
    res.send('New user created!')
}
const readUser=(req,res)=>{
    const users=getUsers()
    res.send(users)
}
const updateUser=(req,res)=>{
    const users=getUsers()
    const userId=parseInt(req.params.id)
    const updates=req.body

    const user=users.find((user)=>user.id==userId)
    if(!user){
        return res.status(404).send(`User Not Found`)
    }

    Object.assign(user, updates)

    res.send('User updated!')
}
const deleteUser=(req,res)=>{
    const users=getUsers()
    const userId=parseInt(req.params.id)

    const userIndex=users.findIndex((user)=>user.id==userId)
    if(userIndex === -1){
        return res.status(404).send(`User Not Found`)
    }

    delUser(userIndex)

    res.send('User deleted!')
}

export {createUser, readUser, updateUser, deleteUser}