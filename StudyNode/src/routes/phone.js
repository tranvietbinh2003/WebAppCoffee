import * as controllers from '../controllers'
import  express  from 'express'
import verifyToken from '../middlewares/verify_token'
import { isCreaterOrAdmin } from '../middlewares/verify_roles' // check phân quyền
import uploadCloud from '../middlewares/uploader'

const router = express.Router()

//public routes
router.get('/', controllers.getPhones)

//PRIVATE ROUTES
router.use(verifyToken)
router.use(isCreaterOrAdmin)
router.post('/', uploadCloud.single('image'), controllers.creatNewPhones)
router.get('/:id', controllers.getPhoneDetail)
//uploadCloud.single (upload 1 ảnh)
// router.get('/', controllers.getCurrent)

router.put('/', uploadCloud.single('image'), controllers.updatePhones)
router.delete('/', controllers.deletePhones)
module.exports = router