import { loginUser } from './../controllers/user.controller'
import { Router } from 'express'

const router: Router = Router()

router.post('/', loginUser)
export default router
