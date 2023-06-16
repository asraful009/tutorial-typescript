import { GenderEnum } from 'src/common/enum/address/user/gender.enum';
import { BaseParam } from '../base.param';
import { ApiProperty } from '@nestjs/swagger';

export class UserParam extends BaseParam {
  @ApiProperty({ default: '', required: false })
  name: string;

  @ApiProperty({ default: '', required: false })
  gender!: GenderEnum;
}
