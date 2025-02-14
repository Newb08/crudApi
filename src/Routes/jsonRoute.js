import express from 'express'
import { createUser, readUser, updateUser, deleteUser } from '../Controller/jsonOps.js'

const router=express.Router()

router.post('/users', createUser)
router.get('/users', readUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router