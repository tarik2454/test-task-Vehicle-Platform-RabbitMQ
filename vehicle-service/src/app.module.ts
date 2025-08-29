import { Module } from '@nestjs/common';
import { VehicleModule } from './vehicle/vehicle.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitConsumer } from './rabbit/rabbit';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env'],
    }),
    VehicleModule,
  ],
  providers: [RabbitConsumer],
})
export class AppModule {}
