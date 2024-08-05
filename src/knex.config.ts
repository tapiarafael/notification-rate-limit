import { Knex } from 'knex';
import { registerAs } from '@nestjs/config';

export default registerAs('knex', () => {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

  const config: Knex.Config = {
    client: 'pg',
    connection: {
      host: DB_HOST,
      port: Number(DB_PORT),
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    },
  };

  return config;
});
