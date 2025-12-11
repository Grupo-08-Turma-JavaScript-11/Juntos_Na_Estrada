import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioController } from "./controller/usuario.controller";
import { Usuario } from "./entity/usuario.entity";
import { UsuarioService } from "./service/usuario.service";



@Module({
    imports:[TypeOrmModule.forFeature([Usuario])],
    controllers:[UsuarioController],
    providers:[UsuarioService],
    exports: [TypeOrmModule]
})
export class ExercicioModule{}