import { Request, Response, NextFunction } from 'express'
import Container, { Service } from 'typedi'
import RoomsService from './Rooms.Service'
import * as httpStatus from 'http-status'


interface Create {
  id: string,
  name?: string
  host_user: string
  capacity_limit?: number
}

interface Get {
  id: string
}

interface JoinRoom {
  roomId: string
  username: string
}

interface LeaveRoom {
  roomId: string
  username: string
}

interface ChangeHost {
  roomId: string
  username: string
  newHost: string
}

interface Delete {
  id: string
}

interface GetByUser {
  username: string
}

const roomsService = Container.get(RoomsService)

@Service()
export default class RoomsController {
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { body } = request
      const { id, name, host_user, capacity_limit }: Create = body
      const room = await roomsService.createRoom({ name, host_user, capacity_limit })
      return response.status(201).send(room)
    } catch (err) {
      console.log(err, 'err')
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async list(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const users = await roomsService.listRooms()

      return response.status(200).send(users)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async get(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { body } = request
      const { id }: Get = body

      const user = await roomsService.getRoom({ id })

      return response.status(200).send(user)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async getByUser(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { body } = request
      const { username }: GetByUser = body

      const user = await roomsService.getRoomByUser({ username })

      return response.status(200).send(user)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { body } = request
      const { id }: Delete = body

      await roomsService.deleteRoom({ id })

      return response.status(200)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async joinRoom(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { body } = request
      const { roomId, username }: JoinRoom = body
      const room = await roomsService.joinRoom({ roomId, username })

      return response.status(200).send(room)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async leaveRoom(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { body } = request
      const { roomId, username }: LeaveRoom = body
      const room = await roomsService.leaveRoom({ roomId, username })

      return response.status(200).send(room)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async changeHost(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { body } = request
      const { roomId, username, newHost }: ChangeHost = body

      const room = await roomsService.changeHost({ roomId, username, newHost })

      return response.status(200).send(room)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }


}
