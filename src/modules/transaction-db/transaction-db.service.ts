import { QueryError } from '@codismart/architect-toolkit';
import { Injectable } from '@nestjs/common';
import { PgService } from 'src/modules/pg/pg.service';
import { LoggerInstance } from 'src/utils';

@Injectable()
export class TransactionDbService {
  constructor(private readonly dbService: PgService) {}

  async read(sql: string, values: Array<string | number>): Promise<any[]> {
    const SQLQuery = sql.replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ');
    try {
      const rows = await this.dbService.query(SQLQuery, values);
      return rows;
    } catch (error) {
      LoggerInstance.warn(`TransactionDBError [${error.message}]`);
      LoggerInstance.warn(`ReadQueryError [${SQLQuery}], [${values.toString()}]`);
      throw new QueryError(SQLQuery, values);
    }
  }

  async write(sql: string, values: Array<string | number>): Promise<void> {
    const SQLQuery = sql.replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ');
    try {
      await this.dbService.query(SQLQuery, values);
    } catch (error) {
      LoggerInstance.warn(`TransactionDBError [${error.message}]`);
      LoggerInstance.warn(`WriteQueryError [${SQLQuery}], [${values.toString()}]`);
      throw new QueryError(SQLQuery, values);
    }
  }
}
