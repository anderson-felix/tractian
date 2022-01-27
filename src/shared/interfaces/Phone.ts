import { Joi } from 'celebrate';

export interface Phone {
  alias: string;
  phone: number;
}

export const phoneSchema = {
  alias: Joi.string().required(),
  phone: Joi.number().required(),
};
