import { Address, Phone } from '@shared/interfaces';
import {
  Entity,
  Column,
  ObjectIdColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
  AfterLoad,
} from 'typeorm';
import { RoleTypes } from '@modules/user/interfaces/RoleTypes';
import { buildFileLocation } from '@shared/utils';

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

  @Column()
  company_id: ObjectID;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AfterLoad()
  buildLocation() {
    if (this.avatar) this.avatar = buildFileLocation(this.avatar);
  }
}
