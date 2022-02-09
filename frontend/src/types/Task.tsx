export interface ITask {
  done: boolean
  id: number
  text: string
}

export interface ITaskCreate {
  text: string
  token: string
}

export interface ITaskDelete {
  id: number
  token: string
}

export interface ITaskUpdate {
  id: number
  token: string
  text: string
  done: boolean
}
