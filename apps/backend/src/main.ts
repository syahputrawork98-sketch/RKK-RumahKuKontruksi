import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable Shutdown Hooks
  app.enableShutdownHooks();

  // Security Headers
  app.use(helmet());

  // Global Prefix
  app.setGlobalPrefix('api/v1');

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger Documentation
  const swaggerEnabled = configService.get<boolean>('SWAGGER_ENABLED', false);
  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('RKK Backend API')
      .setDescription('API documentation for Rumahku Konstruksi')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory);
  }

  // CORS
  const corsOriginsString = configService.get<string>(
    'CORS_ORIGINS',
    'http://localhost:5173',
  );
  const corsOrigins = corsOriginsString
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

  app.enableCors({
    origin: corsOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = configService.get<number>('PORT', 3001);
  await app.listen(port, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
