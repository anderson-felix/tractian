import { Address, Phone } from '@shared/interfaces';
import { ObjectID } from 'typeorm';

export default interface ICreateOwnerDTO {
  name: string;
  address: Address;
  company_id: ObjectID;
  phones?: Phone[];
}
