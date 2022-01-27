import { Address } from '@shared/interfaces';

export default interface ICreateCompanyDTO {
  name: string;
  email: string;
  federal_document?: string;
  address: Address;
}
