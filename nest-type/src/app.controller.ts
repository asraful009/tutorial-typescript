import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './common/entity/user/user.entity';
import { Sex, faker } from '@faker-js/faker';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserDto } from './common/dto/user/user.dto';
import { AddressEntity } from './common/entity/address.entity';
import { AddressEnum } from './common/enum/address/address.enum';
import { getRandomEnumValue } from './common/function/get-random-enum.func';
import { GenderEnum } from './common/enum/address/user/gender.enum';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  getHello(): UserDto[] {
    const dtoes: UserDto[] = [];
    for (let i = 0; i < 2000; i++) {
      const entity: UserEntity = new UserEntity();
      const gender: GenderEnum = getRandomEnumValue(GenderEnum, [0, 1]);
      entity.id = faker.string.uuid();
      entity.createAt = new Date();
      entity.name = faker.person.fullName({
        sex: gender === GenderEnum.FEMALE ? 'female' : 'male',
      });
      entity.avatar = faker.image.avatarGitHub();
      entity.gender = gender;
      entity.addressEntities = [];
      for (let j = 0; j < 3; j++) {
        const addressEntity: AddressEntity = new AddressEntity();
        addressEntity.id = faker.string.uuid();
        addressEntity.createAt = new Date();
        addressEntity.addressType = getRandomEnumValue(AddressEnum, j);
        addressEntity.street = faker.location.streetAddress({
          useFullAddress: true,
        });
        entity.addressEntities.push(addressEntity);
      }
      const dto: UserDto = this.mapper.map(entity, UserEntity, UserDto);
      dtoes.push(dto);
    }

    return dtoes;
  }
}
