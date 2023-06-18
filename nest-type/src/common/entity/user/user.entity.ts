import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../base.entity';
import { AddressEntity } from '../address.entity';
import { GenderEnum } from 'src/common/enum/address/user/gender.enum';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'name', length: 1024 })
  @AutoMap()
  name: string;

  @Column({ name: 'avatar', length: 1024 })
  @AutoMap()
  avatar!: string;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.OTHER,
  })
  @AutoMap()
  gender!: GenderEnum;

  @OneToMany(() => AddressEntity, (addressEntity) => addressEntity.userEntity, {
    cascade: true,
  })
  @AutoMap(() => [AddressEntity])
  addressEntities: AddressEntity[];
}
