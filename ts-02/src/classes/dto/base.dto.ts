import { AutoMap } from "@automapper/classes";

export abstract class BaseDto {
  @AutoMap()
  id!: string;

  @AutoMap()
  createAt!: Date;
}
