import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { UserDto } from './common/dto/user/user.dto';
import { AddressEntity } from './common/entity/address.entity';
import { UserEntity } from './common/entity/user/user.entity';
import { AddressEnum } from './common/enum/address/address.enum';
import { GenderEnum } from './common/enum/address/user/gender.enum';
import { getRandomEnumValue } from './common/function/get-random-enum.func';
import { UserParam } from './common/param/user/user.param';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  private _entities: UserEntity[] = [];
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(AddressEntity)
    private addressesRepository: Repository<AddressEntity>,
  ) {
    this._generate();
  }

  findAll(query: UserParam): UserDto[] {
    const dtoes: UserDto[] = this._entities
      .sort(
        (userA, UserB) => userA.createAt.getTime() - UserB.createAt.getTime(),
      )
      .filter((user: UserEntity) => {
        if (query.name === undefined || query.name === null) return true;
        return user.name.toLowerCase().includes(query.name.toLowerCase());
      })
      .slice(query.offset, query.offset + query.pageSize)
      .map((entity) => this.mapper.map(entity, UserEntity, UserDto));

    return dtoes;
  }

  private async _generate(): Promise<void> {
    for (let i = 0; i < 20; i++) {
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
        addressEntity.userEntity = entity;
        addressEntity.createAt = new Date();
        addressEntity.addressType = getRandomEnumValue(AddressEnum, j);
        addressEntity.street = faker.location.streetAddress({
          useFullAddress: true,
        });
        entity.addressEntities.push(addressEntity);
      }
      this._entities.push(entity);
    }

    await this.usersRepository.save(this._entities);
  }
}
