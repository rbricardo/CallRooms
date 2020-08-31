import { closeConnection, getConnection } from '@db'

beforeAll(async () => await getConnection())
afterAll(async () => await closeConnection())
