import React, { createContext, ReactNode, useContext, useState } from 'react'
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query'
import {
  createTasksbyUserApi,
  deleteTasksbyUserApi,
  getTasksbyUserApi,
  updateTasksbyUserApi,
} from '../services/todo'
import { ITask, ITaskCreate, ITaskDelete, ITaskUpdate } from '../types/Task'
import { AuthContext, IAuthContext } from './AuthContext'

export interface ITodoContext {
  tasks: ITask[]
  getTasks: UseQueryResult<any, unknown>
  createTask: (text: string) => void
  deleteTask: (id: number) => Promise<void>
  updateTask: (id: number, text: string, done: boolean) => Promise<void>
}

export const TodoContext = createContext<ITodoContext>({} as ITodoContext)

const TodoContextProvider = ({ children }: { children: ReactNode }): any => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const { user } = useContext<IAuthContext>(AuthContext)

  const getTasksQuery: UseQueryResult<any, unknown> = useQuery(
    ['task', user.token],
    () => getTasksbyUserApi(user.token),
    {
      onSuccess: (data: any) => {
        if (data.status === 200) {
          setTasks(data.data.task)
        }
      },
      enabled: false,
    }
  )

  const createTaskMutation: UseMutationResult<any, unknown, ITaskCreate, unknown> = useMutation({
    mutationFn: createTasksbyUserApi,
    onSuccess: (response) => {
      if (response.status === 200) {
        getTasksQuery.refetch()
      }
    },
  })

  const deleteTaskMutation: UseMutationResult<any, unknown, ITaskDelete, unknown> = useMutation({
    mutationFn: deleteTasksbyUserApi,
    onSuccess: (response) => {
      if (response.status === 200) {
        getTasksQuery.refetch()
      }
    },
  })

  const updateTaskMutation: UseMutationResult<any, unknown, ITaskUpdate, unknown> = useMutation({
    mutationFn: updateTasksbyUserApi,
    onSuccess: (response) => {
      if (response.status === 200) {
        getTasksQuery.refetch()
      }
    },
  })

  const createTask = (text: string) => {
    createTaskMutation.mutate({ token: user.token, text })
  }

  const deleteTask = async (id: number) => {
    deleteTaskMutation.mutate({ token: user.token, id })
  }

  const updateTask = async (id: number, text: string, done: boolean) => {
    updateTaskMutation.mutate({ token: user.token, id, text, done })
  }
  return (
    <TodoContext.Provider
      value={{
        tasks,
        getTasks: getTasksQuery,
        createTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContextProvider
