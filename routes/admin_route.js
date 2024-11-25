import express from 'express'
import { create_admin } from '../controllers/admin/admin_auth.js'
import { trycatch } from '../middleware/trycatch.js'
import { blockUser, deleteUser, userProfileedit, viewUser } from '../controllers/admin/admin_usermanagment.js'


const route = express.Router()


 route.post("/createadmin", trycatch(create_admin))
 route.get('/viewalluser',trycatch(viewUser))
 route.put('/edituser/:userId',trycatch(userProfileedit))
 route.patch('/blockuser/:userId',trycatch(blockUser))
 route.patch('/deleteuser/:userId',trycatch(deleteUser))



 export default route