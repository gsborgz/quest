import { Client } from 'pg';

type Database = {
  getServerStatus(): Promise<DatabaseStatus>;
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

export type DatabaseStatus = {
  version: string;
  max_connections: number;
  opened_connections: number;
}

const database: Database = {
  async getServerStatus(): Promise<DatabaseStatus> {
    const client = new Client(databaseConfig);

    try {
      await client.connect();

      const serverVersion = await client.query('SHOW server_version;');
      const serverMaxConnections = await client.query('SHOW max_connections;');
      const serverOpenedConnections = await client.query({
        text: 'SELECT count(*)::int from pg_stat_activity WHERE datname = $1;',
        values: [process.env.POSTGRES_DB]
      });

      const body: DatabaseStatus = {
        version: serverVersion.rows[0].server_version,
        max_connections: Number(serverMaxConnections.rows[0].max_connections),
        opened_connections: serverOpenedConnections.rows[0].count
      };

      return body;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await client.end();
    }
  },

  async query(query: string): Promise<any> {
    const client = new Client(databaseConfig);

    try {
      await client.connect();

      const result = await client.query(query);

      return result;
    } catch (error) {

    } finally {
      await client.end();
    }
  },

  async findOne<T>(): Promise<T> {
    const result = await this.query('');

    return result as any;
  },

  async findAll<T>(): Promise<T> {
    const result = await this.query('');

    return result as any;
  },

  async save<T>(): Promise<T> {
    const result = await this.query('');

    return result as any;
  },

  async delete(): Promise<any> {
    const result = await this.query('');

    return result;
  }
};

export default database;
