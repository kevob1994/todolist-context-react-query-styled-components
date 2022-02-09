import React from 'react'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useMutation, UseMutationResult } from 'react-query'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/session'
import { IUser, IUserLogin, IUserRegister } from '../types/User'

export interface IAuthContext {
  user: IUser
  login: UseMutationResult<any, unknown, IUserLogin, unknown>
  register: UseMutationResult<any, unknown, IUserRegister, unknown>
  logout: () => void
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthContextProvider = ({ children }: { children: ReactNode }): any => {
  const [user, setUser] = useState<IUser>({} as IUser)
  const navigate: NavigateFunction = useNavigate()

  const loginMutation: UseMutationResult<any, unknown, IUserLogin, unknown> = useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      if (response.status === 200) {
        setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
        navigate('/')
      }
    },
  })

  const registerMutation: UseMutationResult<any, unknown, IUserRegister, unknown> = useMutation({
    mutationFn: registerApi,
    onSuccess: (response) => {
      if (response.status === 200) {
        setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
        navigate('/')
      }
    },
  })

  useEffect(() => {
    verifyLogin()
  }, [])

  const verifyLogin = async () => {
    const userStorage = localStorage.getItem('user')
    if (userStorage) {
      const user = await JSON.parse(userStorage)
      setUser(user)
      navigate('/')
    }
  }

  const logout = () => {
    setUser({} as IUser)
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login: loginMutation,
        register: registerMutation,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
