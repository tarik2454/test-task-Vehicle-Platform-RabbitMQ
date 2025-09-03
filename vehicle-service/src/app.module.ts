import { Module } from '@nestjs/common';
import { VehicleModule } from './vehicle/vehicle.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitConsumerService } from './rabbit/consumer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['../../.env'] }),
    VehicleModule,
  ],
  providers: [RabbitConsumerService],
})
export class AppModule {}
