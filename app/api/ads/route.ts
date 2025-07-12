import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();
  const { data, error } = await supabase.from('ads').insert(body).select('*');
  if (error) return new Response(error.message, { status: 400 });
  return Response.json(data[0]);
}
