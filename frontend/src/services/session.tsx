import axios from 'axios'
import { IUserLogin, IUserRegister } from '../types/User'

export async function loginApi(params: IUserLogin): Promise<any> {
  return await axios.post(`${process.env.REACT_APP_URL_API}/auth`, params)
}

export async function registerApi(params: IUserRegister): Promise<any> {
  return await axios.post(`${process.env.REACT_APP_URL_API}/user`, params)
}
