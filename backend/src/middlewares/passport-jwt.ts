import { User } from './../entity/User'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { getRepository } from 'typeorm'
import config from 'config'

export default new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('jwtSecret'),
  },
  async (payload, done) => {
    try {
      const user = await getRepository(User).findOne(payload.user.id)
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    } catch (error) {
      return done(error)
    }
  }
)
