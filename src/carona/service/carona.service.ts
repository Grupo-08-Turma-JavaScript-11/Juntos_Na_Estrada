import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carona } from '../entities/carona.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class CaronaService {
  constructor(
    @InjectRepository(Carona)
    private caronaRepository: Repository<Carona>,
  ) {}

  async findAll(): Promise<Carona[]> {
    return await this.caronaRepository.find({
      relations: {},
    });
  }

  async findById(id: number): Promise<Carona> {
    let carona = await this.caronaRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!carona) {
      throw new HttpException('Carona nao encontrada', HttpStatus.NOT_FOUND);
    }

    return carona;
  }

  async findByEnderecoOrigem(enderecoOrigem: string): Promise<Carona[]> {
    return await this.caronaRepository.find({
      where: { enderecoOrigem: ILike(`%${enderecoOrigem}%`) },
      relations: {},
    });
  }

  async findByEnderecoDestino(enderecoDestino: string): Promise<Carona[]> {
    return await this.caronaRepository.find({
      where: { enderecoDestino: ILike(`%${enderecoDestino}%`) },
      relations: {},
    });
  }

  async create(carona: Carona): Promise<Carona> {

    carona.tempo = carona.distancia / carona.velocidade;

    return await this.caronaRepository.save(carona);

  }

  async update(carona: Carona): Promise<Carona> {
    let buscaCarona: Carona = await this.findById(carona.id);

    if (!buscaCarona) {
      throw new HttpException('Carona nao localizada', HttpStatus.NOT_FOUND);
    }

    return this.caronaRepository.save(carona);
  }

  async delete(id: number): Promise<DeleteResult> {
    let buscaCarona = await this.findById(id);

    if (!buscaCarona) {
      throw new HttpException('Carona nao encontrada', HttpStatus.NOT_FOUND);
    }

    return await this.caronaRepository.delete(id);
  }
}
