import { AutoMap } from "@automapper/classes";
import { BaseDto } from "./base.dto";
import { SpecificationDto } from "./specification.dto";

export class ProductDto extends BaseDto {
  @AutoMap()
  name: string = "";

  @AutoMap()
  description: string = "";

  @AutoMap()
  date: Date = new Date();

  @AutoMap(() => [SpecificationDto])
  specification!: SpecificationDto[];
}
