import { Address, Phone } from '@shared/interfaces';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'unit' })
export class Unit {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column({ default: null })
  picture: string | null;

  @Column()
  address: Address;

  @Column({ default: null })
  phones: Phone[] | null;

  @Column()
  company_id: ObjectID | string;

  @DeleteDateColumn({ default: null })
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
