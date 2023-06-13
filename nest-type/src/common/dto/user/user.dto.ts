import { AutoMap } from '@automapper/classes';
import { BaseDto } from '../base.dto';
import { AddressDto } from '../address.dto';
import { GenderEnum } from 'src/common/enum/address/user/gender.enum';

export class UserDto extends BaseDto {
  @AutoMap()
  name: string;

  @AutoMap(() => [AddressDto])
  addressDtoes!: AddressDto[];

  @AutoMap()
  avatar!: string;

  @AutoMap()
  gender!: GenderEnum;
}
