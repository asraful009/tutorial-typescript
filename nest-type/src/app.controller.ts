import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './common/dto/user/user.dto';
import { UserParam } from './common/param/user/user.param';
import { QueryPipe } from './common/pipe/query.pipe';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  findAll(
    @Query(new QueryPipe<UserParam>(UserParam)) query: UserParam,
  ): UserDto[] {
    console.log({ query });

    const dtoes: UserDto[] = this.appService.getHello(query);

    return dtoes;
  }
}
