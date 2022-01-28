import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { assetStatusType } from '@modules/asset/interfaces/AssetStatusType';
import AssetController from '../controllers/AssetController';

const assetRouter = Router();

assetRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      unit_id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().default(null),
      owner_ids: Joi.array().items(Joi.string()).default(null),
      model: Joi.string().required(),
    },
  }),
  AssetController.create,
);

assetRouter.get('/', AssetController.list);

assetRouter.get(
  '/unit/:unit_id',
  celebrate({
    [Segments.PARAMS]: {
      unit_id: Joi.string().required(),
    },
  }),
  AssetController.listByUnit,
);

assetRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  AssetController.show,
);

assetRouter.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string(),
      description: Joi.string(),
      image: Joi.string().allow(null),
      model: Joi.string(),
      owner_ids: Joi.array().items(Joi.string()),
      status: Joi.string().valid(...assetStatusType),
      health: Joi.number().min(0).max(100),
    },
  }),
  AssetController.update,
);

assetRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  AssetController.delete,
);

export default assetRouter;
