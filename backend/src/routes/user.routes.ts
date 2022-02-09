import { createUser } from './../controllers/user.controller'
import { Router } from 'express'

const router: Router = Router()

router.post('/', createUser)
// .put('/', getUsers)
// .delete('/', getUsers)
export default router
