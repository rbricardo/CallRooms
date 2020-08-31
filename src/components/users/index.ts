import { Router } from 'express'
import { Container } from 'typedi'

import UsersValidator from './Users.Validator'
import UsersController from './Users.Controller'
import { authMiddleware } from '../_middlewares/auth'

const usersValidator = Container.get(UsersValidator)
const usersController = Container.get(UsersController)

export default (app: Router): void => {
  const API = Router()

  API.post('/', usersValidator.create(), usersController.create)
  API.get('/', usersController.list)
  API.get('/:id', usersValidator.get(), usersController.get)
  API.put('/', authMiddleware, usersValidator.update(), usersController.update)
  API.delete('/', authMiddleware, usersValidator.delete(), usersController.delete)
  API.post('/login', usersController.login)

  app.use('/users', API)
}
