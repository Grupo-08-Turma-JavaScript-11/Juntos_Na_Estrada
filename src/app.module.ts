import { Module } from '@nestjs/common';
import { Carona } from './carona/entities/carona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaronaModule } from './carona/carona.module';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
