import fs from 'fs'

const filePath = './Models/data.json';

const readData=(path)=>{
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
}
const writeData=(data)=>{
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const createUser=(req,res)=>{
    const users=readData(filePath)
    const newUser=req.body

    users.push(newUser)
    writeData(users)
    
    res.send('New user added')
}

const readUser=(req,res)=>{
    const users=readData(filePath)
    res.send(users)
}

const updateUser=(req,res)=>{
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
}

const deleteUser=(req,res)=>{
    const users=readData(filePath)
    const userId=parseInt(req.params.id)

    const user=users.find((user) => user.id === userId);
    if(!user){
        return res.send(`No user with id:${userId} exist`)
    }

    users.splice(userId-1,1)
    writeData(users)

    res.send(`User data deleted`)
}

export { createUser, readUser, updateUser, deleteUser };