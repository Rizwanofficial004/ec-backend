import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api/v1');
  const logger = new Logger('Bootstrap');

  const port: number = 4000;
  const env: string = 'development';

  if (env === 'development') {
    // Swagger configuration
    const swaggerConfigDoc = new DocumentBuilder()
      .setTitle('EC Backend')
      .setDescription('This is EC backend')
      .setVersion('0.1')
      .addBearerAuth()
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfigDoc);
    SwaggerModule.setup('api', app, swaggerDocument);
  }

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });

  await app.listen(port);
  logger.log(`Server is running on: ${await app.getUrl()}`);
}

bootstrap().catch((error) => {
  console.error('Bootstrap error:', error);
});
