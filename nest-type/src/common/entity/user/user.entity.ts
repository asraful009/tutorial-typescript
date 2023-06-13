import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../base.entity';
import { AddressEntity } from '../address.entity';
import { GenderEnum } from 'src/common/enum/address/user/gender.enum';

export class UserEntity extends BaseEntity {
  @AutoMap()
  name: string;

  @AutoMap(() => [AddressEntity])
  addressEntities!: AddressEntity[];

  @AutoMap()
  avatar!: string;

  @AutoMap()
  gender!: GenderEnum;
}
