import * as Joi from 'joi'

export const idValidator = Joi.string().trim().empty().required();