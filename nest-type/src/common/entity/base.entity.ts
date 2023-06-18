import { AutoMap } from '@automapper/classes';
import { Column, PrimaryColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryColumn()
  @AutoMap()
  id!: string;

  @Column({ name: 'create_at', type: 'datetime' })
  @AutoMap()
  createAt!: Date;
}
