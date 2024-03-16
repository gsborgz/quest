import { Client } from 'pg';

type Database = {
  query: (query: string) => Promise<any>;
  findOne: <T>() => Promise<T>;
  findAll: <T>() => Promise<T>;
  save: <T>() => Promise<T>;
  delete: () => Promise<any>;
}

const databaseConfig = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
};

const database: Database = {
  async query(query: string): Promise<any> {
    const client = new Client(databaseConfig);

    await client.connect();

    const result = await client.query(query);

    await client.end();

    return result;
  },

  async findOne<T>(): Promise<T> {
    const client = new Client(databaseConfig);

    await client.connect();

    const result = await client.query('');

    await client.end();

    return result as any;
  },

  async findAll<T>(): Promise<T> {
    const client = new Client(databaseConfig);

    await client.connect();

    const result = await client.query('');

    await client.end();

    return result as any;
  },

  async save<T>(): Promise<T> {
    const client = new Client(databaseConfig);

    await client.connect();

    const result = await client.query('');

    await client.end();

    return result as any;
  },

  async delete(): Promise<any> {
    const client = new Client(databaseConfig);

    await client.connect();

    const result = await client.query('');

    await client.end();

    return result;
  }
};

export default database;
