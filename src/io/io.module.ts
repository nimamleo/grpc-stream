import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { GrpcGetawayController } from './grpc/grpc-getaway.controller';

@Module({ imports: [ApplicationModule], controllers: [GrpcGetawayController] })
export class IoModule {}
