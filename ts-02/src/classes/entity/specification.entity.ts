import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "./base.entity";

export class SpecificationEntity extends BaseEntity {
  @AutoMap()
  type!: string;

  @AutoMap()
  description!: string;
}
