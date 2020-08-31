import { celebrate, Joi, Segments } from 'celebrate'
import { Service } from 'typedi'
import { RequestHandler } from 'express'

@Service()
export default class CategoriesValidator {
  public create(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        id: Joi.string().required(),
        name: Joi.string().optional(),
        host_user: Joi.string().required(),
        capacity_limit: Joi.number().optional(),
      },
    })
  }
  public get(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        id: Joi.string().required(),
      },
    })
  }
  public getByUser(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        username: Joi.string().required(),
      },
    })
  }
  public update(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        id: Joi.string().required(),
        password: Joi.string().optional(),
        mobile_token: Joi.string().optional(),
      },
    })
  }
  public delete(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        id: Joi.string().required(),
      },
    })
  }
  public joinRoom(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        id: Joi.string().required(),
        username: Joi.string().required(),
      },
    })
  }
  public leaveRoom(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        id: Joi.string().required(),
        username: Joi.string().required(),
      },
    })
  }
  public changeHost(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        id: Joi.string().required(),
        username: Joi.string().required(),
        newHost: Joi.string().required(),
      },
    })
  }
}
