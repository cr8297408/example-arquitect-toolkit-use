import { Module } from '@nestjs/common';
import { TransactionDbModule } from '../modules/transaction-db/transaction-db.module';

@Module({
  imports: [TransactionDbModule],
  providers: [],
  exports: [],
})
export class RepositoryModule {}
