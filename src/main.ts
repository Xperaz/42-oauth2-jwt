import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
// app.enableCors()
//   const config = new DocumentBuilder()
//         .setTitle('Nest API')
//         .setDescription('Intra Oauth2')
//         .setVersion('1.0')
//         .build();
        
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('/api', app, document);
  require("dotenv").config();
  // app.enableCors({
  //   origin: ['http://localhost:3000'],
  //   credentials: true,
  // });
  
  
  
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
