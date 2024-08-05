import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';

@Injectable()
export class KnexProvider {
  private readonly connection: Knex;
  constructor(private readonly configService: ConfigService) {
    this.connection = knex(this.configService.get<Knex.Config>('knex', {}));
  }

  query(): Knex.QueryBuilder {
    return this.connection.queryBuilder();
  }
}
