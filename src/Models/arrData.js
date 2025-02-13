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

const getUsers = ()=> users
const addUser = (user) => users.push(user)
const delUser = (ind) => users.splice(ind,1)
export {getUsers, addUser, delUser}