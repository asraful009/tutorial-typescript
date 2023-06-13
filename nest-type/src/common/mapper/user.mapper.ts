import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { UserEntity } from '../entity/user/user.entity';
import { UserDto } from '../dto/user/user.dto';
import { AddressDto } from '../dto/address.dto';
import { AddressEntity } from '../entity/address.entity';

export class UserMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, AddressEntity, AddressDto);
      createMap(
        mapper,
        UserEntity,
        UserDto,
        forMember(
          (dto) => dto.addressDtoes,
          mapFrom((entity) =>
            entity.addressEntities.map((addressEntity) =>
              mapper.map(addressEntity, AddressEntity, AddressDto),
            ),
          ),
        ),
      );
    };
  }
}
