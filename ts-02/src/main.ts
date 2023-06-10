import { createMap } from "@automapper/core";
import { ProductEntity } from "./classes/entity/product.entity";
import { ProductDto } from "./classes/dto/product.dto";
import { mapper } from "./mapper/mapper";

const entity: ProductEntity = new ProductEntity();
entity.id = "145987";
entity.name = "uyy";
entity.description = "yh jgh jhg";
entity.date = new Date();
entity.createAt = new Date();
entity.specification = [
  { id: "123", createAt: new Date(), description: "asdasd asd", type: "we" },
  { id: "223", createAt: new Date(), description: "asdasd asd", type: "we" },
  { id: "323", createAt: new Date(), description: "asdasd asd", type: "we" },
  { id: "423", createAt: new Date(), description: "asdasd asd", type: "we" },
];
createMap(mapper, ProductEntity, ProductDto);
const dto: ProductDto = mapper.map(entity, ProductEntity, ProductDto);
console.log({ entity, dto: 2 });
