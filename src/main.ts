import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '127.0.0.1:50052',
      package: 'grpc',
      protoPath: path.join(__dirname, './io/grpc/proto/grpc.proto'),
    },
  });

  await app.init();
  await app.startAllMicroservices();
}
bootstrap();
