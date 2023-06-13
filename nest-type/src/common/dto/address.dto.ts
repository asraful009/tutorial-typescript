import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';
import { AddressEnum } from '../enum/address/address.enum';

export class AddressDto extends BaseDto {
  @AutoMap()
  addressType!: AddressEnum;

  @AutoMap()
  street!: string;
}
