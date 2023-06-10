import { AutoMap } from "@automapper/classes";
import { BaseDto } from "./base.dto";

export class SpecificationDto extends BaseDto {
  @AutoMap()
  type!: string;

  @AutoMap()
  description!: string;
}
