import { roleTypes } from '@modules/user/interfaces/RoleTypes';
import { addressSchema, phoneSchema } from '@shared/interfaces';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      company_id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      avatar: Joi.string().default(null),
      role: Joi.string()
        .valid(...roleTypes)
        .required(),
      federal_document: Joi.string().default(null),
      phones: Joi.array().items(Joi.object().keys(phoneSchema)).default(null),
      address: Joi.object().keys(addressSchema).default(null),
    },
  }),
  UserController.create,
);

userRouter.get(
  '/avatar_upload_link',
  celebrate({
    [Segments.QUERY]: {
      file_name: Joi.string().required(),
      mime_type: Joi.string().required(),
    },
  }),
  UserController.uploadLink,
);

userRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  UserController.show,
);

userRouter.get(
  '/company/:company_id',
  celebrate({
    [Segments.PARAMS]: {
      company_id: Joi.string().required(),
    },
  }),
  UserController.listByCompany,
);

userRouter.get('/', UserController.list);

userRouter.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string(),
      email: Joi.string().email(),
      role: Joi.string().valid(...roleTypes),
      federal_document: Joi.string().allow(null),
      phones: Joi.array().items(Joi.object().keys(phoneSchema)).allow(null),
      address: Joi.object().keys(addressSchema).allow(null),
      avatar: Joi.string().allow(null),
    },
  }),
  UserController.update,
);

userRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  UserController.delete,
);

export default userRouter;
