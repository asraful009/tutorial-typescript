import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { AddressEnum } from '../enum/address/address.enum';
import { UserEntity } from './user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'addresses' })
export class AddressEntity extends BaseEntity {
  @Column({
    name: 'gender',
    type: 'enum',
    enum: AddressEnum,
    default: AddressEnum.OTHER,
  })
  @AutoMap()
  addressType!: AddressEnum;

  @Column({ name: 'street', length: 1024 })
  @AutoMap()
  street: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.addressEntities)
  @JoinColumn({ name: 'user_id' })
  userEntity: UserEntity;
}
