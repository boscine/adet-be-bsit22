// src/controllers/post.controller.ts
// Controller — handles request logic, calls the model, returns responses

import { Context } from 'hono';
import * as PostModel from '../models/post.model.js';

// ── GET /api/posts ─────────────────────────────────────────────────────────────
export async function getAllPosts(c: Context) {
  const posts = await PostModel.getAllPosts();
  return c.json({ success: true, data: posts });
}

// ── GET /api/posts/:id ─────────────────────────────────────────────────────────
export async function getPostById(c: Context) {
  const id   = Number(c.req.param('id'));
  const post = await PostModel.getPostById(id);

  if (!post) return c.json({ success: false, message: 'Post not found' }, 404);
  return c.json({ success: true, data: post });
}

// ── POST /api/posts ────────────────────────────────────────────────────────────
export async function createPost(c: Context) {
  const body = await c.req.json();
  const { title, description, status } = body;

  // Validation
  if (!title || !description) {
    return c.json({ success: false, message: 'Title and description are required' }, 400);
  }

  const post = await PostModel.createPost({ title, description, status });
  return c.json({ success: true, data: post }, 201);
}

// ── PATCH /api/posts/:id ───────────────────────────────────────────────────────
export async function updatePost(c: Context) {
  const id   = Number(c.req.param('id'));
  const body = await c.req.json();

  // Check if post exists
  const existing = await PostModel.getPostById(id);
  if (!existing) return c.json({ success: false, message: 'Post not found' }, 404);

  const post = await PostModel.updatePost(id, body);
  return c.json({ success: true, data: post });
}

// ── DELETE /api/posts/:id ──────────────────────────────────────────────────────
export async function deletePost(c: Context) {
  const id      = Number(c.req.param('id'));
  const deleted = await PostModel.deletePost(id);

  if (!deleted) return c.json({ success: false, message: 'Post not found' }, 404);
  return c.json({ success: true, message: 'Post deleted successfully' });
}
