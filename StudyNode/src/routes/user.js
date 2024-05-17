import * as controllers from '../controllers'
import  express  from 'express'
import verifyToken from '../middlewares/verify_token'
// import { isAdmin,isModeratorOrAdmin } from '../middlewares/verify_roles' // check phân quyền


const router = require('express').Router()

//public routes


//private routes( Phân quyền )
router.use(verifyToken)
// router.use(isModeratorOrAdmin)  // phân quyền admin or moderator

// router.use(isAdmin)    // phân quyền admin
router.get('/', controllers.getCurrent)

module.exports = router

