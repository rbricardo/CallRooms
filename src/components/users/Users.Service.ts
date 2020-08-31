import { Service } from 'typedi'
import { DeleteResult } from 'typeorm'
import { User } from '@db/models/User'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import authConfig from './config/auth'

interface CreateUser {
  username: string
  password: string
  mobile_token: string
}

interface GetUser {
  id: string
}

interface UpdateUser {
  id: string
  password?: string
  mobile_token?: string
}

interface DeleteUser {
  id: string
}

interface Login {
  username: string
  password: string
}

@Service()
export default class UsersService {
  public async createUser({ username, password }: CreateUser): Promise<User> {
    const hashPassword = await bcrypt.hash(password, 10)
    const userToken = Math.ceil(Math.random() * 1000000)
    return await User.create({
      username,
      password: hashPassword,
    }).save()
  }

  public async listUsers(): Promise<User[]> {
    return await User.find()
  }

  public async getUser({ id }: GetUser): Promise<User> {
    return await User.findOne({ id })
  }

  public async updateUser({ id, password, mobile_token }: UpdateUser): Promise<User> {
    const user = await this.getUser({ id })
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10)
      user.password = hashPassword
    }
    if (mobile_token) user.mobile_token = mobile_token
    return await user.save()
  }

  public async deleteUser({ id }: DeleteUser): Promise<DeleteResult> {
    return await User.delete(id)
  }

  public async login({ username, password }: Login): Promise<any> {

    const user = await User.findOne({ username })
    if (!user) {
      throw { error: 'User not found' }
    }
    const isCorrectPass = await bcrypt.compare(password, user.password)
    if (!isCorrectPass) {
      throw { error: 'Wrong pass' }
    }
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400
    })

    user.password = undefined
    user.created_at = undefined
    user.updated_at = undefined
    user.deleted_at = undefined

    return {user, token}
  }
}