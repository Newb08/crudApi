import express from 'express'
import {createUser, readUser, updateUser, deleteUser} from '../Controller/arrOps.js'

const router=express.Router()

router.post('/add-user', createUser)
router.get('/users', readUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router