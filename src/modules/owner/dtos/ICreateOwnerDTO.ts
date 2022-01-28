import { Address, Phone } from '@shared/interfaces';

export default interface ICreateOwnerDTO {
  name: string;
  address: Address;
  phones?: Phone[];
}
