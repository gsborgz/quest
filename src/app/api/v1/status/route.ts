import database, { DatabaseStatus } from '@/core/database';

export type AppStatus = {
  updated_at: string;
  dependencies: {
    database: DatabaseStatus;
  }
}

export async function GET() {
  const databaseStatus = await database.getServerStatus();
  const updatedAt = new Date().toISOString();
  const body: AppStatus = {
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseStatus.version,
        max_connections: databaseStatus.max_connections,
        opened_connections: databaseStatus.opened_connections
      }
    }
  };

  return Response.json(body)
}
