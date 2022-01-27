import { Company } from '@modules/company/infra/typeorm/entities/Company';
import { Address, Phone } from '@shared/interfaces';

export default interface ICreateUnitDTO {
  name: string;
  picture?: string;
  address: Address;
  phones?: Phone[];
  company: Company;
}
