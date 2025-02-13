let users=[
    {
        "id": 1,
        "name": "Alice",
        "age": 25
      },
      {
        "id": 2,
        "name": "Bob",
        "age": 30
      },
      {
        "id": 3,
        "name": "Charlie",
        "age": 22
      }
]

const getUsers = ()=> {
  try {
    return users
  }catch(error){
    console.log(`Error from arrData.js file:`,error)
    return error.name
  }
}
const addUser = (user) =>{
  try {
    return users.push(user)
  } catch (error) {
    console.log(`Error from arrData.js file:`,error)
    return error.name
  } 
}
const delUser = (ind) =>{
  try {
    return users.splice(ind,1)
  } catch (error) {
    console.log(`Error from arrData.js file:`,error)
    return error.name
  }
} 
export {getUsers, addUser, delUser}