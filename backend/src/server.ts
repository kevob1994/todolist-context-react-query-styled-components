import 'reflect-metadata'
import express, { Application } from 'express'
import config from 'config'
import cors from 'cors'
import passport from 'passport'
import { createConnection } from 'typeorm'

import JWTStrategy from './middlewares/passport-jwt'

import auth from './routes/auth.routes'
import user from './routes/user.routes'
import task from './routes/task.routes'

const app: Application = express()
createConnection()
const port: number = config.get('port')

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
passport.use(JWTStrategy)

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/task', task)

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server Started at PORT: ${port}`)
})
