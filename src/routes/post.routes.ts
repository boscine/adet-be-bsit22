// src/routes/post.routes.ts
// Router — maps HTTP methods and paths to controller functions

import { Hono } from 'hono';
import * as PostController from '../controllers/post.controller.js';

const router = new Hono();

router.get('/',     PostController.getAllPosts);   // GET    /api/posts
router.get('/:id',  PostController.getPostById);  // GET    /api/posts/:id
router.post('/',    PostController.createPost);   // POST   /api/posts
router.patch('/:id',PostController.updatePost);   // PATCH  /api/posts/:id
router.delete('/:id',PostController.deletePost);  // DELETE /api/posts/:id

export default router;
