import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { addressSchema, phoneSchema } from '@shared/interfaces';
import UnitController from '../controllers/UnitController';

const unitRouter = Router();

unitRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      company_id: Joi.string().required(),
      picture: Joi.string().allow(null),
      address: Joi.object().keys(addressSchema).required(),
      phones: Joi.array().items(Joi.object().keys(phoneSchema)),
    },
  }),
  UnitController.create,
);

unitRouter.get('/', UnitController.list);

unitRouter.get(
  '/company/:company_id',
  celebrate({
    [Segments.PARAMS]: {
      company_id: Joi.string().required(),
    },
  }),
  UnitController.listByCompany,
);

unitRouter.get(
  '/picture_upload_link',
  celebrate({
    [Segments.QUERY]: {
      file_name: Joi.string().required(),
      mime_type: Joi.string().required(),
    },
  }),
  UnitController.uploadLink,
);

unitRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  UnitController.show,
);

unitRouter.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string(),
      picture: Joi.string().allow(null),
      address: Joi.object().keys(addressSchema),
      phones: Joi.array().items(Joi.object().keys(phoneSchema)),
    },
  }),
  UnitController.update,
);

unitRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  UnitController.delete,
);

export default unitRouter;
