import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentInstance } from 'src/enviroment';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvironmentInstance.getConfig],
      isGlobal: true,
    }),
  ],
})
export class CustomConfigModule {}
