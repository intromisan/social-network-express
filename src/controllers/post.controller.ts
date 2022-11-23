import { Request, Response } from 'express';
import { createPost, findAllPosts, findAndDeletePost, findAndUpdatePost, findPost } from '../services/post.service';
import { createPostInput, deletePostInput, getPostInput, updatePostInput } from '../schema/post.schema';
import log from '../utils/logger';

export async function createPostHandler(req: Request<{}, {}, createPostInput['body']>, res: Response) {
  const body = req.body;
  const userId = res.locals.user._id;

  log.info({ userId, ...body });

  try {
    const post = await createPost({ userId, ...body });
    return res.status(201).send(post);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function updatePostHandler(req: Request<updatePostInput['params']>, res: Response) {
  const postId = req.params.id;
  const updateBody = req.body;

  try {
    const post = await findPost({ postId });
    if (!post) return res.status(404).send('Post with this ID does not exist');

    const updatedPost = await findAndUpdatePost({ postId }, updateBody, { new: true });
    return res.status(200).send(updatedPost);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function getPostHandler(req: Request<getPostInput['params']>, res: Response) {
  const postId = req.params.id;

  try {
    const post = await findPost({ postId });
    if (!post) return res.status(404).send('Post with this ID does not exist');
    return res.status(200).send(post);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function deletePostHandler(req: Request<deletePostInput['params']>, res: Response) {
  const postId = req.params.id;

  try {
    const post = await findPost({ postId });
    if (!post) return res.status(404).send('Post with this ID does not exist');

    await findAndDeletePost({ postId });
    return res.status(200).send('Deleted successfully');
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function getAllPostsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  try {
    const posts = await findAllPosts({ userId });
    return res.status(200).send(posts);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}
