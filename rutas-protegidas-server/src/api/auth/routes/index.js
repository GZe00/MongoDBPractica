import * as express from "express";
import { createUser, loginUser } from '../controllers/'
const router = express.Router();


router.post('/register', createUser)
router.post('/login', loginUser) 


export default router