import { Address, Phone } from '@shared/interfaces';
import { Company } from '@modules/company/infra/typeorm/entities/Company';
import { RoleTypes } from '../interfaces/RoleTypes';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  role: RoleTypes;
  federal_document?: string;
  phones?: Phone[];
  address?: Address;
  company: Company;
}
