import fs from 'fs'

const filePath = './src/Models/data.json';

const readData=(path)=>{
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
}
const writeData=(data)=>{
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const createUser=(req,res)=>{
    try {
        const users=readData(filePath)
        const newUser=req.body

        users.push(newUser)
        writeData(users)
        
        res.send('New user added')        
    } 
    catch (error) {
        res.status(500).send(`User can't be added`)
        console.log(`Error from jsonOps.js file `,error)        
    }
    
}

const readUser=(req,res)=>{
    try {
        const users=readData(filePath)
        res.send(users)
    } catch (error) {
        res.status(500).send(`Can't fetch user details`)
        console.log(`Error from jsonOps.js file `,error)
    }
    
}

const updateUser=(req,res)=>{
    try {
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
    catch (error) {
        res.status(500).send(`User can't be updated`)
        console.log(`Error from jsonOps.js file `,error)
    }
    
}

const deleteUser=(req,res)=>{
    try {
        const users=readData(filePath)
        const userId=parseInt(req.params.id)

        const user=users.find((user) => user.id === userId);
        if(!user){
            return res.send(`No user with id:${userId} exist`)
        }

        users.splice(userId-1,1)
        writeData(users)

        res.send(`User data deleted`)
    } catch (error) {
        res.status(500).send(`User can't be deleted`)
        console.log(`Error from jsonOps.js file `,error)
    }
    
}

export { createUser, readUser, updateUser, deleteUser };