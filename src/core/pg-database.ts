import 'reflect-metadata';
import { join } from 'node:path';
import { DataSource, Migration, MigrationExecutor } from 'typeorm';

type PgDatabase = {
  getServerStatus(): Promise<PgDatabaseStatus>;
  dryRunMigrations(): Promise<Migration[]>;
  runMigrations(): Promise<Migration[]>;
  query: (query: string) => Promise<any>;
  findOne: <T>() => Promise<T>;
  findAll: <T>() => Promise<T>;
  save: <T>() => Promise<T>;
  delete: () => Promise<any>;
}

export type PgDatabaseStatus = {
  version: string;
  max_connections: number;
  opened_connections: number;
}

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, 'entities', '*.entity.ts')],
  migrations: [join(__dirname, 'migrations', '*.ts')],
  ssl: process.env.NODE_ENV === 'development' ? false : true
});

export const pgDatabase: PgDatabase = {
  async getServerStatus(): Promise<PgDatabaseStatus> {
    try {
      await PostgresDataSource.initialize();

      const serverVersionResult = await PostgresDataSource.manager.query('SHOW server_version;');
      const serverMaxConnectionsResult = await PostgresDataSource.manager.query('SHOW max_connections;');
      const serverOpenedConnectionsResult = await PostgresDataSource.manager.query('SELECT count(*)::int from pg_stat_activity WHERE datname = $1;', [process.env.POSTGRES_DB]);

      const body: PgDatabaseStatus = {
        version: serverVersionResult[0].server_version,
        max_connections: Number(serverMaxConnectionsResult[0].max_connections),
        opened_connections: serverOpenedConnectionsResult[0].count
      };

      return body;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await PostgresDataSource.destroy();
    }
  },

  async dryRunMigrations(): Promise<Migration[]> {
    try {
      await PostgresDataSource.initialize();

      const executor = new MigrationExecutor(PostgresDataSource);
      const migrations = await executor.getPendingMigrations();

      return migrations;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await PostgresDataSource.destroy();
    }
  },

  async runMigrations(): Promise<Migration[]> {
    try {
      await PostgresDataSource.initialize();

      const executor = new MigrationExecutor(PostgresDataSource);
      const migrations = await executor.executePendingMigrations();

      return migrations;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await PostgresDataSource.destroy();
    }
  },

  async query(query: string): Promise<any> {
    try {
      PostgresDataSource.initialize();

      const result = await PostgresDataSource.manager.query(query);

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      PostgresDataSource.destroy();
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
