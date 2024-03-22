import migrationRunner, { RunnerOption } from 'node-pg-migrate';
import { join } from 'node:path';

const migrationRunnerOptions: RunnerOption = {
  databaseUrl: process.env.DATABASE_URL,
  dir: join('infra', 'migrations'),
  migrationsTable: 'pgmigrations',
  direction: 'up'
};

export async function GET() {
  const migrations = await migrationRunner({
    ...migrationRunnerOptions,
    dryRun: true
  });

  return Response.json(migrations)
}

export async function POST() {
  const migrations = await migrationRunner({
    ...migrationRunnerOptions,
    dryRun: false
  });

  return Response.json(migrations)
}
