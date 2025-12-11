import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service'
import { Categoria } from '../entities/categoria.entity';

@Controller('categorias')
export class CategoriaController {

  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.findById(id);
  }

  @Post()
  create(@Body() categoria: Categoria) {
    return this.categoriaService.create(categoria);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoria: Categoria
  ) {
    return this.categoriaService.update(id, categoria);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.delete(id);
  }
}
