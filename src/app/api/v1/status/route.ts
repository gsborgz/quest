import database from '@/core/database';

export async function GET() {
  const result = await database.query('SELECT 1 + 1;');

  console.log(result);

  return Response.json({ message: 'apenas um teste' })
}
