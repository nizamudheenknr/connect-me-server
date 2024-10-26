import express from 'express'
import { create_admin } from '../controllers/admin/admin_auth.js'
import { trycatch } from '../middleware/trycatch.js'


const route = express.Router()


 route.post("/createadmin", trycatch(create_admin))


 export default route