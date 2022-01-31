import { AssetStatusType } from '@modules/asset/interfaces/AssetStatusType';
import { buildFileLocation } from '@shared/utils';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'asset' })
export class Asset {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  model: string;

  @Column({ default: null })
  image: string | null;

  @Column({ default: null })
  owner_ids: ObjectID[] | null;

  @Column()
  unit_id: ObjectID;

  @Column({ default: 'stopped' })
  status: AssetStatusType;

  @Column({ default: 0 })
  health: number;

  @DeleteDateColumn({ default: null })
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AfterLoad()
  buildLocation() {
    if (this.image) this.image = buildFileLocation(this.image);
  }
}
