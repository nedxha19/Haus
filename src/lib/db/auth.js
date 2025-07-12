/*  ──────────────────────────────────────────────
    src/lib/db/auth.js
    Clean, concise, production-ready
   ────────────────────────────────────────────── */

import { createConnection } from './mysql';
import bcrypt               from 'bcrypt';
import { v4 as uuidv4 }     from 'uuid';

/* ────────────────────────────────────────────── */
/*  Session-token helper (must be defined first) */
/* ────────────────────────────────────────────── */
export async function createSessionToken(userId) {
  const db = await createConnection();
  const token   = uuidv4();
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await db.execute(
    'UPDATE users SET session_token = ?, session_expiration = ? WHERE id = ?',
    [token, expires, userId]
  );
  db.release();
  return token;
}

/* ────────────────────────────────────────────── */
/*  Login                                        */
/* ────────────────────────────────────────────── */
export async function login(email, password) {
  const db = await createConnection();

  try {
    // 1 · fetch user
    const [rows] = await db.query(
      'SELECT id, password_hash FROM users WHERE email = ?',
      [email]
    );
    if (!rows.length) {
      return { token: null, message: 'Email not found' };
    }

    // 2 · verify password
    const ok = await bcrypt.compare(password, rows[0].password_hash);
    if (!ok) {
      return { token: null, message: 'Incorrect password' };
    }

    // 3 · invalidate old sessions & create new one
    await db.execute(
      'UPDATE users SET session_token = NULL, session_expiration = NULL WHERE id = ?',
      [rows[0].id]
    );
    const token = await createSessionToken(rows[0].id);
    return { token, message: 'Login successful' };

  } catch (err) {
    console.error('🔴 LOGIN ERROR:', err);   //  <-- shows exact stack-trace
    throw err;                               // 500 returned to client
  } finally {
    db.release();                            // always release pool conn
  }
}

/* ────────────────────────────────────────────── */
/*  Register                                     */
/* ────────────────────────────────────────────── */
export async function register(email, username, password) {
  const db = await createConnection();

  try {
    // uniqueness checks
    const [emailTaken]    = await db.query('SELECT 1 FROM users WHERE email = ?',    [email]);
    const [usernameTaken] = await db.query('SELECT 1 FROM users WHERE username = ?', [username]);
    if (emailTaken.length)    return { success: false, message: 'Email already in use' };
    if (usernameTaken.length) return { success: false, message: 'Username already in use' };

    // create user
    const hash = await bcrypt.hash(password, 12);
    await db.execute(
      'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)',
      [email, username, hash]
    );

    return { success: true, message: 'User registered successfully' };

  } catch (err) {
    console.error('🔴 REGISTER ERROR:', err);
    throw err;
  } finally {
    db.release();
  }
}
