import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entity/User'

interface IUserRequest extends Request {
  body: User
}

// @route    POST api/auth
// @desc     Register user & get token
// @access   Public
export const createUser = async (req: IUserRequest, res: Response): Promise<Response> => {
  try {
    const { firstname, lastname, email } = req.body
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    const userExist = await getRepository(User).findOne({ email })
    if (userExist) {
      return res.status(400).json({ errors: [{ msg: 'User Exist' }] })
    }
    const user = await getRepository(User).save({
      firstname,
      lastname,
      email,
      password,
    })

    const payload = {
      user: {
        id: user.id,
      },
    }

    const token = await jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000,
    })
    return res.json({ ...user, token })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body
  try {
    const user = await getRepository(User).findOne({ email })

    if (user && user.email == email) {
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
      }

      const payload = {
        user: {
          id: user.id,
        },
      }
      const token = await jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000,
      })
      return res.json({ ...user, token })
    }

    return res.status(400).json({ msg: 'Not user found' })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}
