import { Hono }  from 'hono';
import jwt       from 'jsonwebtoken';
import bcrypt    from 'bcryptjs';

const router = new Hono();

// ── Types ──────────────────────────────────────────────────────────────────────
interface User {
  id:       number;
  email:    string;
  password: string;
}

interface LoginBody {
  email:    string;
  password: string;
}

// Temporary in-memory user — replace with a DB call later
const users: User[] = [
  {
    id:       1,
    email:    'test@test.com',
    password: bcrypt.hashSync('password', 8),
  },
];

// ── POST /api/auth/login ───────────────────────────────────────────────────────
router.post('/login', async (c) => {
  const { email, password } = await c.req.json<LoginBody>();

  // 1. Find user
  const user = users.find(u => u.email === email);
  if (!user) return c.json({ message: 'Invalid credentials' }, 401);

  // 2. Check password
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) return c.json({ message: 'Invalid credentials' }, 401);

  // 3. Sign and return token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );

  return c.json({ token });
});

export default router;
