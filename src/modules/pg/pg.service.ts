import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient } from 'pg';
import { IEnvConfig } from 'src/enviroment';

@Injectable()
export class PgService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private configService: ConfigService<IEnvConfig>) {
    this.pool = new Pool({
      host: this.configService.get<string>('TRANSACTION_DB_HOST'),
      port: this.configService.get<number>('TRANSACTION_DB_PORT'),
      user: this.configService.get<string>('TRANSACTION_DB_USER'),
      password: this.configService.get<string>('TRANSACTION_DB_PASSWORD'),
      database: this.configService.get<string>('TRANSACTION_DB_NAME'),
    });
  }

  async onModuleInit() {
    await this.pool.connect();
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query<T>(text: string, params?: any[]): Promise<T[]> {
    const client: PoolClient = await this.pool.connect();
    try {
      const res = await client.query(text, params);
      return res.rows;
    } finally {
      client.release();
    }
  }
}
