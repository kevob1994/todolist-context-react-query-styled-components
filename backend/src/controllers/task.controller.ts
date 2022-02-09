import { Request, Response } from 'express'
import { getRepository, DeleteResult, UpdateResult } from 'typeorm'
import { User } from '../entity/User'
import { Task } from './../entity/Task'

export const getTasks = async (req: Request, res: Response): Promise<Response> => {

  try {
    const user: any = req.user
    const userInfo: User | undefined = await getRepository(User).findOne(user?.id, {
      relations: ['task'],
    })
    if (userInfo) {
      const { task } = userInfo
      return res.json({ task })
    }
    return res.json({ msg: 'not exist user' })
  } catch (error) {
    return res.json({ error })
  }
}
export const createTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user: any = req.user
    const task = await getRepository(Task).save({
      text: req.body.text,
      done: false,
      user: user.id,
    })
    return res.json({ task })
  } catch (error) {
    return res.json({ error })
  }
}

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response: UpdateResult = await getRepository(Task).update(
      { id: Number(req.params.id) },
      {
        text: req.body.text,
        done: req.body.done,
      }
    )
    if (!response.affected) {
      return res.json({ msg: 'La tarea que desea editar no existe' })
    }
    const task = await getRepository(Task).findOne(Number(req.params.id))
    return res.json({ task })
  } catch (error) {
    return res.json({ error })
  }
}

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response: DeleteResult = await getRepository(Task).delete({
      id: Number(req.params.id),
    })

    const task = await getRepository(Task).findOne(Number(req.params.id))
    if (!task && response.affected) {
      return res.json({ delete: true, msg: 'La tarea ha sido eliminada' })
    }
    return res.json({ delete: false, msg: 'La tarea no existe' })
  } catch (error) {
    return res.json({ error })
  }
}
