import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { BaseParam } from '../param/base.param';

export class QueryPipe<T extends BaseParam> implements PipeTransform<T> {
  constructor(private readonly clazz: { new (): T }) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(rowValue: T, _metadata: ArgumentMetadata) {
    const param: T = new this.clazz();
    param.pageNo = parseInt(`${rowValue.pageNo}`);
    param.pageSize = parseInt(`${rowValue.pageSize}`);
    param.sortBy = `${rowValue.sortBy}`;
    this.valueTransform(param);
    console.log({ param });
    return param;
  }

  private valueTransform(param: T): void {
    param.pageNo = Number.isInteger(param.pageNo) ? param.pageNo : 1;
    param.pageSize = Number.isInteger(param.pageSize)
      ? param.pageSize > 20
        ? 20
        : param.pageSize
      : 10;
  }
}
