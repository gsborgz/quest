import migrationRunner from 'node-pg-migrate';

export async function GET() {
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dir: 'migrations',
    migrationsTable: 'migrations',
    direction: 'up',
    dryRun: true
  });

  return Response.json(migrations)
}
