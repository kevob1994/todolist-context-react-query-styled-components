import axios from 'axios'
import { ITaskCreate, ITaskDelete, ITaskUpdate } from '../types/Task'

export async function getTasksbyUserApi(token: string): Promise<any> {
  return await axios.get(`${process.env.REACT_APP_URL_API}/task/`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function createTasksbyUserApi({ token, text }: ITaskCreate): Promise<any> {
  return await axios.post(
    `${process.env.REACT_APP_URL_API}/task/`,
    { text },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
}

export async function deleteTasksbyUserApi({ token, id }: ITaskDelete): Promise<any> {
  return await axios.delete(`${process.env.REACT_APP_URL_API}/task/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function updateTasksbyUserApi({ token, id, text, done }: ITaskUpdate): Promise<any> {
  return await axios.put(
    `${process.env.REACT_APP_URL_API}/task/${id}`,
    { text, done },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
}
