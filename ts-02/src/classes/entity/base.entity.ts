import { AutoMap } from "@automapper/classes";

export abstract class BaseEntity {
  @AutoMap()
  id!: string;

  @AutoMap()
  createAt!: Date;
}
