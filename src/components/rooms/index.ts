import { Router } from 'express'
import { Container } from 'typedi'

import RoomsValidator from './Rooms.Validator'
import RoomsController from './Rooms.Controller'
import { authMiddleware } from '../_middlewares/auth'

const roomsValidator = Container.get(RoomsValidator)
const roomsController = Container.get(RoomsController)

export default (app: Router): void => {
  const API = Router()

  API.post('/', authMiddleware, roomsValidator.create(), roomsController.create)
  API.get('/', roomsController.list)
  API.get('/:id', roomsController.get)
  API.post('/getByUser', roomsController.getByUser)
  API.post('/join', authMiddleware,roomsController.joinRoom)
  API.post('/leave', authMiddleware, roomsController.leaveRoom)
  API.post('/changeHost', roomsController.changeHost)
  API.delete('/', authMiddleware, roomsValidator.delete(), roomsController.delete)

  app.use('/rooms', API)
}
