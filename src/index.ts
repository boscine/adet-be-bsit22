// src/index.ts
// Entry point — sets up the Hono app and starts the server

import { serve } from '@hono/node-server';
import { Hono }  from 'hono';
import { cors }  from 'hono/cors';
import 'dotenv/config';

import postRoutes from './routes/post.routes.js';

const app  = new Hono();
const PORT = Number(process.env.PORT) || 3000; // Here

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use('*', cors());

// ── Routes ─────────────────────────────────────────────────────────────────────
app.route('/api/posts', postRoutes);

// ── Health Check ───────────────────────────────────────────────────────────────
app.get('/', (c) => c.json({ message: 'Hono MVC API is running!' }));

// ── Start Server ───────────────────────────────────────────────────────────────
serve({ fetch: app.fetch, port: PORT }, () =>
  console.log(`API running → http://localhost:${PORT}`) // tawagon 
);
