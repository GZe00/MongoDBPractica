import * as express from "express"
import {getProfile} from '../controllers'
// const { requiresAuth } = require('express-openid-connect');
import {isAuthenticated} from  '../../../middleware/isAuthenticated'

const router = express.Router()

router.get('/', isAuthenticated, getProfile);

// router.get('/')
// router.put('/:id')
// router.delete('/')

export default router