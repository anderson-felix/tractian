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
import { RoleTypes } from '@modules/user/interfaces/RoleTypes';
import { Company } from '@modules/company/infra/typeorm/entities/Company';

@Entity({ name: 'user' })
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  avatar: string | null;

  @Column({ nullable: false, default: null })
  federal_document: string | null;

  @Column({ nullable: false })
  role: RoleTypes;

  @Column({ type: 'json', default: null })
  address: Address | null;

  @Column({ type: 'json', default: null })
  phones: Phone[] | null;

  @DeleteDateColumn({ default: null })
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column(() => Company)
  company: Company;
}
