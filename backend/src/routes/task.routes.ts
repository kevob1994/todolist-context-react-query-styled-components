import { getTasks, createTask, updateTask, deleteTask } from './../controllers/task.controller'
import { Router } from 'express'
import passport from 'passport'

const router: Router = Router()

router
  .get('/', passport.authenticate('jwt', { session: false }), getTasks)
  .post('/', passport.authenticate('jwt', { session: false }), createTask)
  .put('/:id', passport.authenticate('jwt', { session: false }), updateTask)
  .delete('/:id', passport.authenticate('jwt', { session: false }), deleteTask)

export default router
