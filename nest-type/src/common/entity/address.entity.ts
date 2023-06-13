import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { AddressEnum } from '../enum/address/address.enum';

export class AddressEntity extends BaseEntity {
  @AutoMap()
  addressType!: AddressEnum;

  @AutoMap()
  street!: string;
}
