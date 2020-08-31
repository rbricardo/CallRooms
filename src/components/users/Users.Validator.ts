import { celebrate, Joi, Segments } from 'celebrate'
import { Service } from 'typedi'
import { RequestHandler } from 'express'

@Service()
export default class CategoriesValidator {
  public create(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        username: Joi.string().required(),
        password: Joi.string().required(),
        mobile_token: Joi.string().optional(),
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
  public login(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        username: Joi.string().required(),
        password: Joi.string().required(),
      },
    })
  }
}
