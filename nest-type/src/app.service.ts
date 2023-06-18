import { Injectable } from '@nestjs/common';
import { UserEntity } from './common/entity/user/user.entity';
import { GenderEnum } from './common/enum/address/user/gender.enum';
import { getRandomEnumValue } from './common/function/get-random-enum.func';
import { faker } from '@faker-js/faker';
import { AddressEntity } from './common/entity/address.entity';
import { AddressEnum } from './common/enum/address/address.enum';
import { log } from 'console';
import { UserDto } from './common/dto/user/user.dto';
import { UserParam } from './common/param/user/user.param';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class AppService {
  private _entities: UserEntity[] = [];
  constructor(@InjectMapper() private readonly mapper: Mapper) {
    this._generate();
    log(this._entities.length, this._entities[0]);
  }

  findAll(query: UserParam): UserDto[] {
    const dtoes: UserDto[] = this._entities
      .filter((user: UserEntity) =>
        user.name.toLowerCase().includes(query.name.toLowerCase()),
      )
      .map((entity) => this.mapper.map(entity, UserEntity, UserDto));

    return dtoes;
  }

  private _generate(): void {
    for (let i = 0; i < 1000; i++) {
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
      this._entities.push(entity);
    }
  }
}
