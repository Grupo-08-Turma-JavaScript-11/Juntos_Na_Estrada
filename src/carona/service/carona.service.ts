import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Carona } from "../entities/carona.entity";
import { ILike, Repository } from "typeorm";


@Injectable()
export class CaronaService{

    constructor(
        @InjectRepository(Carona)
        private caronaRepository: Repository<Carona>
    ){ }

    async findAll(): Promise<Carona[]>{
        return await this.caronaRepository.find({
            relations: {}
        })
    }

    async findById(id: number): Promise<Carona>{

        let carona = await this.caronaRepository.findOne({
            where: {id},
            relations: {}
        })

        if(!carona){
            throw new HttpException('Carona nao encontrada', HttpStatus.NOT_FOUND)
        }

        return carona;
    }

    async findByCidadeOrigem(cidadeOrigem: string): Promise<Carona[]>{
        return await this.caronaRepository.find({
            where: {cidadeOrigem: ILike(`%${cidadeOrigem}%`)},
            relations: {}
        })
    }

    async findByCidadeDestino(cidadeDestino: string): Promise<Carona[]>{
        return await this.caronaRepository.find({
            where: {cidadeDestino: ILike(`%${cidadeDestino}%`)},
            relations: {}
        })
    }

    async create(carona: Carona): Promise<Carona>{
        return await this.caronaRepository.save(carona);
    }

}