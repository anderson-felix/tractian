import { Address, Phone } from '@shared/interfaces';
import {
  Entity,
  Column,
  ObjectIdColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
  ManyToOne,
} from 'typeorm';
import { RoleTypes } from '@modules/user/interfaces/RoleTypes';
import { Company } from '@modules/company/infra/typeorm/entities/Company';

@Entity({ name: 'user' })
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string | null;

  @Column()
  federal_document: string | null;

  @Column()
  role: RoleTypes;

  @Column()
  address: Address | null;

  @Column()
  phones: Phone[] | null;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Company)
  company: Company;
}
