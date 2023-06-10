import { AutoMap } from "@automapper/classes";
import { extend } from "@automapper/core";
import { BaseEntity } from "./base.entity";
import { SpecificationEntity } from "./specification.entity";

export class ProductEntity extends BaseEntity {
  @AutoMap()
  name: string = "";

  @AutoMap()
  description: string = "";

  @AutoMap()
  date: Date = new Date();

  @AutoMap(() => [SpecificationEntity])
  specification!: SpecificationEntity[];
}
