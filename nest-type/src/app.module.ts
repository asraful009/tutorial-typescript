import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserMapper } from './common/mapper/user.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './common/entity/user/user.entity';
import { AddressEntity } from './common/entity/address.entity';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'db',
      password: 'db',
      database: 'db',
      entities: [UserEntity, AddressEntity],
      synchronize: true,
      logging: true,
      charset: 'utf8mb4_0900_ai_ci',
    }),
    TypeOrmModule.forFeature([UserEntity, AddressEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, UserMapper],
})
export class AppModule {}
