import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Juntos na Estrada')
  .setDescription('Projeto Juntos na Estrada')
  .setContact("Juntos na Estrada", "http://www.generationbrasil.online", "grupo8turmajavascript11@gmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00'

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors()

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
