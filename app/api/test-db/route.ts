// app/api/users/route.ts
export const runtime = 'nodejs';

import getUsers from '@/state/actions/getUsers';

export async function GET() {
  const result = await getUsers();
  return Response.json(result);
}
