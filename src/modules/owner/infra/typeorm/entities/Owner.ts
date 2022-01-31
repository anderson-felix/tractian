import { Address, Phone } from '@shared/interfaces';
import {
  Entity,
  Column,
  ObjectIdColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
} from 'typeorm';

@Entity({ name: 'owner' })
export class Owner {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  address: Address;

  @Column({ default: null })
  phones: Phone[] | null;

  @Column()
  company_id: ObjectID;

  @DeleteDateColumn({ default: null })
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
