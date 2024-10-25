import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomConfigModule } from './modules/config/custom-config.module';
import { HealthModule } from './modules/health';
import { LoggerMiddleware } from './middlewares';
import { TransactionDbModule } from './modules/transaction-db/transaction-db.module';
import { TransactionDbService } from './modules/transaction-db/transaction-db.service';
import { PgModule } from './modules/pg/pg.module';
import { PgService } from './modules/pg/pg.service';
import { APP_FILTER } from '@nestjs/core';
import { SystemErrorExceptionFilter } from './errors';

@Module({
  imports: [CustomConfigModule, HealthModule, TransactionDbModule, PgModule],
  controllers: [],
  providers: [
    TransactionDbService,
    PgService,
    {
      provide: APP_FILTER,
      useClass: SystemErrorExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('v1');
  }
}
