import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173','http://localhost:5174'],
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
  }));

  app.setGlobalPrefix('api');

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('SaaS Tienda API')
    .setDescription('API de la tienda')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api/docs', app, document)

  await app.listen(3000)

  console.log('API corriendo en http://localhost:3000/api')
  console.log('Swagger en http://localhost:3000/api/docs')

}

bootstrap();