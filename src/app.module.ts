import { Module } from '@nestjs/common';
import { Carona } from './carona/entities/carona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaronaModule } from './carona/carona.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { CategoriaModule } from './categoria/categoria.module';
import { AppController } from './app.controller';
import { ProdService } from './data/services/prod.service';
import { ConfigModule } from '@nestjs/config';
import { DevService } from './data/services/dev.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    UsuarioModule,
    CaronaModule,
    CategoriaModule 
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
