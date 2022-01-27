import { Joi } from 'celebrate';

export interface Address {
  alias: string;
  address: string;
  number: number;
  complement: string | null;
  zip_code: string;
  city: string;
  state: string;
  country: string;
}

export const addressSchema = {
  alias: Joi.string().required(),
  address: Joi.string().required(),
  number: Joi.number().required(),
  complement: Joi.string().allow('').default(''),
  zip_code: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
};
