import { Address, Phone } from '@shared/interfaces';
import { RoleTypes } from '../interfaces/RoleTypes';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  avatar: string | null;
  role: RoleTypes;
  federal_document: string | null;
  phones: Phone[] | null;
  address: Address | null;
  company_id: string;
}
