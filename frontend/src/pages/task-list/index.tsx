import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Input from '../../components/Input'
import ItemTodo from '../../components/ItemTodo'
import { AuthContext, IAuthContext } from '../../context/AuthContext'
import { ITodoContext, TodoContext } from '../../context/TodoContext'

const TaskList = () => {
  const [text, setText] = useState<string>('')
  const { user, logout } = useContext<IAuthContext>(AuthContext)
  const { tasks, getTasks, createTask } = useContext<ITodoContext>(TodoContext)

  useEffect(() => {
    getTasks.refetch()
  }, [])

  const handlerNewTask = () => {
    createTask(text)
    setText('')
  }

  const renderTasks = () => tasks?.map((task) => <ItemTodo task={task} key={task.id} />)

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>
          {`${user?.firstname} ${user?.lastname}`} {}
        </h1>
        <Button primary width="100px" onClick={() => logout()}>
          Cerrar sesion
        </Button>
      </div>
      <h3>Lista de tareas</h3>
      <DivFlex>
        <Input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        />
        <Button primary onClick={handlerNewTask}>
          Agregar nueva tarea
        </Button>
      </DivFlex>
      <div>{tasks.length > 0 ? renderTasks() : <p>No tiene tareas creadas</p>}</div>
    </Container>
  )
}
const Container = styled.div`
  border: 1px solid #282c34;
  width: 70%;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 20px;
  padding: 20px;
`

const DivFlex = styled.div`
  display: flex;
  align-items: center;
  & > input {
    flex: 2;
  }
  & > button {
    flex: 1;
  }
`

export default TaskList
