export interface IUser {
  email: string
  firstname: string
  lastname: string
  name: string
  token: string
}

export interface IUserLogin {
  email: string
  password: string
}

export interface IUserRegister {
  email: string
  firstname: string
  lastname: string
  password: string
}
