import { Service } from 'typedi'
import { DeleteResult } from 'typeorm'
import { Room } from '@db/models/Room'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { parseParticipants } from '../_helpers/utils'
interface CreateRoom {
  name?: string
  host_user: string
  capacity_limit?: number
}

interface GetRoom {
  id: string
}

interface GetRoomByUser {
  username: string
}

interface DeleteRoom {
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


@Service()
export default class RoomsService {
  public async createRoom({ name, host_user, capacity_limit }: CreateRoom): Promise<Room> {
    const username: any = [host_user]
    return await Room.create({
      name,
      host_user,
      capacity_limit,
      participants: username
    }).save()
  }

  public async listRooms(): Promise<Room[]> {
    return await Room.find()
  }

  public async getRoom({ id }: GetRoom): Promise<Room> {
    return await Room.findOne({ id })
  }

  public async getRoomByUser({ username }: GetRoomByUser): Promise<Room[]> {
    const rooms = await this.listRooms()
    const parsedRooms = rooms.filter(room => {
      const participants = JSON.stringify(room.participants)
      let parsedParticipants = parseParticipants(participants)
      const isParticipant = parsedParticipants.find(participant => participant === username)
      return isParticipant !== undefined
    })

    return parsedRooms
  }

  public async deleteRoom({ id }: DeleteRoom): Promise<DeleteResult> {
    return await Room.delete(id)
  }

  public async joinRoom({ roomId, username }: JoinRoom): Promise<Room> {
    console.log(roomId, '????')
    const room = await this.getRoom({ id: roomId })
    console.log(room, 'room')
    if (!room) throw { error: 'Room not found' }
    console.log('aeae')
    const participants = JSON.stringify(room.participants)
    let parsedParticipants = parseParticipants(participants)

    if (parsedParticipants.length === room.capacity_limit) throw { error: 'This room is full' }

    const isUserIn = parsedParticipants.find(p => p === username)

    if (isUserIn) throw { error: 'This user is already in this room' }

    parsedParticipants.push(username)
    room.participants = parsedParticipants

    return await room.save()
  }

  public async leaveRoom({ roomId, username }: LeaveRoom): Promise<Room> {
    console.log(roomId, 'roomId')
    const room = await this.getRoom({ id: roomId })
    console.log(room, 'room')
    if (!room) throw { error: 'Room not found' }

    const participants = JSON.stringify(room.participants)
    let parsedParticipants = parseParticipants(participants)
    let i: number

    const isUserIn = parsedParticipants.find((p: any, index: number) => {
      i = index
      return p === username
    })

    if (!isUserIn) throw { error: 'This user is not in this room' }

    parsedParticipants.splice(i, 1)
    room.participants = parsedParticipants

    if (room.host_user === username) {
      room.host_user = parsedParticipants[0]
    }

    return await room.save()
  }

  public async changeHost({ roomId, username, newHost }: ChangeHost): Promise<Room> {
    const room = await this.getRoom({ id: roomId })
    if (room.host_user !== username) throw { error: 'This user is not a host' }

    const participants = JSON.stringify(room.participants)
    let parsedParticipants = parseParticipants(participants)
    const isNewHostIn = parsedParticipants.find((p: any) => p === newHost)

    if (!isNewHostIn) throw { error: 'The new host is not in this room' }

    room.host_user = newHost

    return room.save()
  }
}