import { ApiProperty } from '@nestjs/swagger';

export class BaseParam {
  @ApiProperty({ default: '1' })
  pageNo: number;

  @ApiProperty({ default: '10' })
  pageSize: number;

  @ApiProperty({ default: 'createAt:desc' })
  sortBy: string;

  offset: number;
}
