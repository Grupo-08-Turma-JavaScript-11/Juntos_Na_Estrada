import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CaronaService } from '../service/carona.service';
import { Carona } from '../entities/carona.entity';
import { DeleteResult } from 'typeorm';

@Controller('/caronas')
export class CaronaController {
  constructor(private readonly caronaService: CaronaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Carona[]>{
    return this.caronaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe)id : number): Promise<Carona>{
    return this.caronaService.findById(id);
  }

  @Get('/origem/:enderecoOrigem')
  @HttpCode(HttpStatus.OK)
  findByEnderecoOrigem(@Param('enderecoOrigem') enderecoOrigem: string): Promise<Carona[]>{
    return this.caronaService.findByEnderecoOrigem(enderecoOrigem);
  }

  @Get('/destino/:enderecoDestino')
  @HttpCode(HttpStatus.OK)
  findByEnderecoDestino(@Param('enderecoDestino') enderecoDestino: string): Promise<Carona[]>{
    return this.caronaService.findByEnderecoDestino(enderecoDestino);
  }

  @Put()
  @HttpCode(HttpStatus.CREATED)
  update(@Body() carona: Carona): Promise<Carona>{
    return this.caronaService.update(carona);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() carona: Carona): Promise<Carona>{
    return this.caronaService.create(carona);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult>{
    return this.caronaService.delete(id);
  }
}
