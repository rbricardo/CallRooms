import { Request, Response, NextFunction } from 'express'
import Container, { Service } from 'typedi'
import jwt from 'jsonwebtoken'
import UsersService from './Users.Service'
import * as httpStatus from 'http-status'


interface Create {
  mobile_token?: string
  password: string
  username: string
}

interface Get {
  id: string
}

interface Update {
  id: string
  password?: string
  mobile_token?: string
}

interface Delete {
  id: string
}

interface Login {
  username: string
  password: string
}

const userService = Container.get(UsersService)

@Service()
export default class UsersController {
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { body } = request
      const { username, password, mobile_token }: Create = body
      const user = await userService.createUser({ username, password, mobile_token })
      return response.status(201).send(user)
    } catch (err) {
      console.log(err, 'err')
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async list(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const users = await userService.listUsers()

      return response.status(200).send(users)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async get(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { body } = request
      const { id }: Get = body

      const user = await userService.getUser({ id })

      return response.status(200).send(user)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { body } = request
      const { id, password, mobile_token }: Update = body
      const user = await userService.updateUser({ id, password, mobile_token })

      return response.status(200).send(user)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { body } = request
      const { id }: Delete = body

      await userService.deleteUser({ id })

      return response.status(200)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async login(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    const { username, password }: Login = request.body
    try {
      const user = await userService.login({ username, password })
      return response.status(200).send(user)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }
}
