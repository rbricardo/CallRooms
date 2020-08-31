// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from 'express'
import authConfig from '../users/config/auth'

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization

    if (!authHeader) return response.status(401).send({ error: 'No token provided' })

    const parts = authHeader.split(' ')

    if (parts.length !== 2) return response.status(401).send({ error: 'Token error' })

    const [scheme, token] = parts

    if(scheme !== 'Bearer') return response.status(401).send({ error: 'Token malformatted' })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return response.status(401).send({ error: 'Invalid Token' })
        request.body.id = decoded.id
        return next()
    })
}