import { redirect } from '@sveltejs/kit';
import { createConnection } from '$lib/db/mysql';

export const load = async ({ cookies }) => {
  const token = cookies.get('session');
  if (token) {
    const db = await createConnection();
    await db.execute(
      'UPDATE users SET session_token = NULL, session_expiration = NULL WHERE session_token = ?',
      [token]
    );
    db.release();
  }

  cookies.set('session', '', { path: '/', maxAge: -1 });
  throw redirect(302, '/admin/login');
};