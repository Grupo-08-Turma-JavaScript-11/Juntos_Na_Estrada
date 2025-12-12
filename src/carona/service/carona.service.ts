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
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Carona> {
    let carona = await this.caronaRepository.findOne({
      where: { id },
      relations: {
        categoria: true,
        usuario: true,
      },
    });

    if (!carona) {
      throw new HttpException('Carona nao encontrada', HttpStatus.NOT_FOUND);
    }

    return carona;
  }

  async findByEnderecoOrigem(enderecoOrigem: string): Promise<Carona[]> {
    return await this.caronaRepository.find({
      where: { enderecoOrigem: ILike(`%${enderecoOrigem}%`) },
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async findByEnderecoDestino(enderecoDestino: string): Promise<Carona[]> {
    return await this.caronaRepository.find({
      where: { enderecoDestino: ILike(`%${enderecoDestino}%`) },
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async create(carona: Carona): Promise<Carona> {

    carona.tempo = await this.tempoviagem(carona)

    return this.caronaRepository.save(carona);

  }

  async tempoviagem(carona: Carona): Promise<string>{

    const tempo = carona.distancia / carona.velocidade
    
    const hora = Math.floor(tempo / 60)

    const minuto = tempo % 60

    const minutosFormatados = minuto < 10 ? '0' + minuto : minuto;
    
     const horaMinuto: string = `${hora}h ${minutosFormatados}m`

    return await horaMinuto
  }


  async update(carona: Carona): Promise<Carona> {
    let buscaCarona: Carona = await this.findById(carona.id);

    if (!buscaCarona) {
      throw new HttpException('Carona nao localizada', HttpStatus.NOT_FOUND);
    }

    carona.tempo = await this.tempoviagem(carona)

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
