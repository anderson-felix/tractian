import { AssetStatusType } from '@modules/asset/interfaces/AssetStatusType';
import { Unit } from '@modules/unit/infra/typeorm/entities/Unit';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
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
  owner: string | null;

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

  @ManyToOne(() => Unit)
  unit: Unit;
}
