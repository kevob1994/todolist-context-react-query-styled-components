import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Login from '../pages/login'
import Register from '../pages/register'
import TaskList from '../pages/task-list'

const Router = () => {
  const { user } = React.useContext(AuthContext)

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<TaskList />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={user.token ? <TaskList /> : <Navigate to="/login" />} />
    </Routes>
  )
}
export default Router
