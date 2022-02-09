import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ITodoContext, TodoContext } from '../../context/TodoContext'
import { PropsBtn } from '../../types/Style'
import { ITask } from '../../types/Task'
import Button from '../Button'
import Input from '../Input'

interface IItemTodoProps {
  task: ITask
}

export const ItemTodo = ({ task }: IItemTodoProps) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [done, setDone] = useState<boolean>(true)
  const [text, setText] = useState<string>('')
  const { deleteTask, updateTask } = useContext<ITodoContext>(TodoContext)
  useEffect(() => {
    if (edit) {
      setText(task.text)
      setDone(task.done)
    } else {
      setText('')
      setDone(true)
    }
  }, [edit])

  const handlerDeleteTask = () => {
    deleteTask(task.id)
  }

  const handlerupdateTask = () => {
    updateTask(task.id, text, done)
    setEdit(false)
  }

  return (
    <ItemTask>
      {!edit ? (
        <>
          <p>{task.text}</p>

          <div style={{ display: 'flex' }}>
            {task.done ? (
              <StatusTask color="#2fc315">terminada</StatusTask>
            ) : (
              <StatusTask color="#ff5a5a">Por hacer</StatusTask>
            )}
            <Button primary onClick={() => setEdit(true)} width="150px">
              Editar
            </Button>
            <Button width="150px" onClick={() => handlerDeleteTask()}>
              Eliminar
            </Button>
          </div>
        </>
      ) : (
        <>
          <Input
            type="text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          />
          {done ? (
            <Button
              primary
              color="#2fc315"
              hovercolor="#67cb56"
              clickcolor="#90dd83"
              onClick={() => setDone(false)}
              width="150px"
            >
              Retomar
            </Button>
          ) : (
            <Button
              primary
              color="#ff5a5a"
              hovercolor="#e58585"
              clickcolor="#e9aeae"
              onClick={() => setDone(true)}
              width="150px"
            >
              Finalizar
            </Button>
          )}

          <Button primary width="150px" onClick={() => handlerupdateTask()}>
            Guardar
          </Button>
          <Button onClick={() => setEdit(false)} width="150px">
            Cancelar
          </Button>
        </>
      )}
    </ItemTask>
  )
}

const ItemTask = styled.div`
  border: 1px solid #282c34;
  height: 70px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 20px;
`

const StatusTask = styled.div<PropsBtn>`
  margin-right: 20px;
  background: #e1e0e0;
  font-size: 1em;
  padding: 1em 1em;
  margin: 6px;
  border: none;
  font-weight: bold;
  min-width: 110px;
  color: ${(props) => (props.color ? props.color : '#282c34')};
  text-align: center;
`

export default ItemTodo
