import { pgDatabase } from '@/core/pg-database';

export async function GET() {
  const migrations = await pgDatabase.dryRunMigrations();

  return Response.json(migrations);
}

export async function POST() {
  const migrations = await pgDatabase.runMigrations();

  return Response.json(migrations)
}
