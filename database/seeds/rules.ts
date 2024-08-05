import { Knex } from 'knex';
import { randomUUID } from 'node:crypto';

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('rules').insert([
    { id: randomUUID(), type: 'STATUS', limit: 3, period: 'minute' },
    { id: randomUUID(), type: 'NEWS', limit: 5, period: 'minute' },
    { id: randomUUID(), type: 'OTHERS', limit: 2, period: 'hour' },
  ]);
}
