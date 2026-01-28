import { Module } from '@nestjs/common';
import { Carona } from './carona/entities/carona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaronaModule } from './carona/carona.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { CategoriaModule } from './categoria/categoria.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "12345678",
      database: "db_juntos_na_estrada",
      entities: [Usuario, Carona, Categoria],
      synchronize: true,
    }),
    UsuarioModule,
    CaronaModule,
    CategoriaModule 
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
