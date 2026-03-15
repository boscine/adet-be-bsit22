// src/models/post.model.ts
// Model — handles all database queries for the posts table

import pool from '../config/db.js';

// ── Types ──────────────────────────────────────────────────────────────────────
export interface Post {
  post_id:     number;
  title:       string;
  description: string;
  status:      'open' | 'closed';
  created_at:  Date;
}

export interface CreatePostInput {
  title:       string;
  description: string;
  status?:     'open' | 'closed';
}

export interface UpdatePostInput {
  title?:       string;
  description?: string;
  status?:      'open' | 'closed';
}

// ── Model Methods ──────────────────────────────────────────────────────────────

// GET all posts
export async function getAllPosts(): Promise<Post[]> {
  const [rows] = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
  return rows as Post[];
}

// GET post by id
export async function getPostById(id: number): Promise<Post | null> {
  const [rows] = await pool.query('SELECT * FROM posts WHERE post_id = ?', [id]) as any;
  return rows[0] || null;
}

// CREATE post
export async function createPost(data: CreatePostInput): Promise<Post> {
  const { title, description, status = 'open' } = data;
  const [result] = await pool.query(
    'INSERT INTO posts (title, description, status) VALUES (?, ?, ?)',
    [title, description, status]
  ) as any;
  const newPost = await getPostById(result.insertId);
  return newPost!;
}

// UPDATE post
export async function updatePost(id: number, data: UpdatePostInput): Promise<Post | null> {
  const fields: string[] = [];
  const values: any[]    = [];

  if (data.title       !== undefined) { fields.push('title = ?');       values.push(data.title); }
  if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }
  if (data.status      !== undefined) { fields.push('status = ?');      values.push(data.status); }

  if (fields.length === 0) return getPostById(id);

  values.push(id);
  await pool.query(`UPDATE posts SET ${fields.join(', ')} WHERE post_id = ?`, values);
  return getPostById(id);
}

// DELETE post
export async function deletePost(id: number): Promise<boolean> {
  const [result] = await pool.query('DELETE FROM posts WHERE post_id = ?', [id]) as any;
  return result.affectedRows > 0;
}
