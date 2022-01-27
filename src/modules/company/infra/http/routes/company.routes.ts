import { addressSchema } from '@shared/interfaces';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const companyRouter = Router();

companyRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      federal_document: Joi.string().allow(null),
      address: Joi.object().keys(addressSchema).required(),
    },
  }),
  CompanyController.create,
);

companyRouter.get('/', CompanyController.list);

companyRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  CompanyController.show,
);

companyRouter.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string(),
      federal_document: Joi.string().allow(null),
      address: Joi.object().keys(addressSchema),
    },
  }),
  CompanyController.update,
);

companyRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  CompanyController.delete,
);

export default companyRouter;
