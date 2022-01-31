import { addressSchema, phoneSchema } from '@shared/interfaces';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import OwnerController from '../controllers/OwnerController';

const ownerRouter = Router();

ownerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      company_id: Joi.string().required(),
      name: Joi.string().required(),
      phones: Joi.array().items(Joi.object().keys(phoneSchema)).default(null),
      address: Joi.object().keys(addressSchema).required(),
    },
  }),
  OwnerController.create,
);

ownerRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  OwnerController.show,
);

ownerRouter.get('/', OwnerController.list);

ownerRouter.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string(),
      phones: Joi.array().items(Joi.object().keys(phoneSchema)).allow(null),
      address: Joi.object().keys(addressSchema).allow(null),
    },
  }),
  OwnerController.update,
);

ownerRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  OwnerController.delete,
);

export default ownerRouter;
