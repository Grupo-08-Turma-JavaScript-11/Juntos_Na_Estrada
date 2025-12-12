import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Carona } from "./entities/carona.entity";
import { CaronaService } from "./service/carona.service";
import { CaronaController } from "./controller/carona.controller";


@Module({
    imports:[TypeOrmModule.forFeature([Carona])],
    providers: [CaronaService],
    controllers:[CaronaController],
    exports: [TypeOrmModule],

})
export class CaronaModule {}