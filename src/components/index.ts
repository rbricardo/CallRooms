import { Router } from 'express'
import HealthCheck from '@components/health-check'
import UsersAPI from '@components/users'
import RoomsAPI from '@components/rooms'


export default (app: Router): void => {
  HealthCheck(app)
  RoomsAPI(app)
  UsersAPI(app)
}
