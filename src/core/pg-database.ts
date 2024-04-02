import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '@prisma/client';
import { Sql } from '@prisma/client/runtime/library';
import { Pool } from 'pg';

export type PgDatabaseStatus = {
  version: string;
  max_connections: number;
  opened_connections: number;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'development' ? false : true
});
const adapter = new PrismaPg(pool);

class PgDatabase {
  private readonly client = new PrismaClient({ adapter });

  async getServerStatus(): Promise<PgDatabaseStatus> {
    try {
      await this.client.$connect();

      const serverVersionResult = await this.client.$queryRaw(Prisma.sql`SHOW server_version`);
      const serverMaxConnectionsResult = await this.client.$queryRaw(Prisma.sql`SHOW max_connections`);
      const serverOpenedConnectionsResult = await this.client.$queryRaw(Prisma.sql`SELECT count(*)::int from pg_stat_activity WHERE datname = ${process.env.POSTGRES_DB}`);
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
      await this.client.$disconnect();
    }
  }

  async query(query: Sql) {
    try {
      await this.client.$connect();

      return this.client.$queryRaw(query);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.client.$disconnect();
    }
  }

  async findOne<T>() {
    try {
      await this.client.$connect();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.client.$disconnect();
    }
  }

  async findAll<T>() {
    try {
      await this.client.$connect();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.client.$disconnect();
    }
  }

  async save<T>() {
    try {
      await this.client.$connect();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.client.$disconnect();
    }
  }

  async delete(): Promise<any> {
    try {
      await this.client.$connect();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.client.$disconnect();
    }
  }
}

export const pgDatabase = new PgDatabase();
