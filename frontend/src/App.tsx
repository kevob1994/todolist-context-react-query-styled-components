import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthContextProvider from './context/AuthContext'
import TodoContextProvider from './context/TodoContext'
import Router from './router/Router'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <TodoContextProvider>
            <Router></Router>
            <ReactQueryDevtools />
          </TodoContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
