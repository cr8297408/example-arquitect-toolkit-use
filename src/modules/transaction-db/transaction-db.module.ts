import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionDbService } from './transaction-db.service';
import { PgModule } from 'src/modules/pg/pg.module';

@Module({
  imports: [ConfigModule, PgModule],
  providers: [TransactionDbService],
  exports: [TransactionDbService],
})
export class TransactionDbModule {}
