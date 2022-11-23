import { Express } from 'express';
import { createPostHandler, deletePostHandler, getAllPostsHandler, getPostHandler, updatePostHandler } from './controllers/post.controller';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from './controllers/session.controller';
import { createUserHandler } from './controllers/user.controller';
import requireUser from './middleware/requireUser';
import validate from './middleware/validateResource';
import { createPostSchema, deletePostSchema, getPostSchema, updatePostSchema } from './schema/post.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
  app.get('/api/healthcheck', (req, res) => res.status(200).send({ message: 'Healthy' }));

  // Users
  app.post('/api/users', validate(createUserSchema), createUserHandler);

  // Session
  app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);
  app.get('/api/sessions', requireUser, getUserSessionHandler);
  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  // Posts
  app.post('/api/posts', [requireUser, validate(createPostSchema)], createPostHandler);
  app.get('/api/posts/:id', [requireUser, validate(getPostSchema)], getPostHandler);
  app.get('/api/posts', requireUser, getAllPostsHandler);
  app.put('/api/posts/:id', [requireUser, validate(updatePostSchema)], updatePostHandler);
  app.delete('/api/posts/:id', [requireUser, validate(deletePostSchema)], deletePostHandler);
}

export default routes;
