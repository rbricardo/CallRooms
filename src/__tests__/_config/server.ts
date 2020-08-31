import app from '../../app'
import * as request from 'supertest'

export const server = request(app)
