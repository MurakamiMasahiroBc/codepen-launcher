/**
 * POST /api/check
 * body: { "password": "xxx" }
 * 200 OK / 401 Unauthorized
 */
export const config = { runtime: 'edge' };

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  try {
    const { password } = await request.json();
    const secret = process.env.ACCESS_TOKEN;
    if (!secret || password === secret) {
      return new Response('OK', { status: 200 });
    }
    return new Response('Unauthorized', { status: 401 });
  } catch {
    return new Response('Bad Request', { status: 400 });
  }
}
