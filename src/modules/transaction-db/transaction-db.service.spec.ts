import { Test, TestingModule } from '@nestjs/testing';
import { TransactionDbService } from './transaction-db.service';

describe('TransactionDbService', () => {
  let service: TransactionDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionDbService],
    }).compile();

    service = module.get<TransactionDbService>(TransactionDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
