import { boolean, object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    title: string({ required_error: 'Title is required' }),
    body: string({ required_error: 'Post body cannot be empty' })
  })
};

const params = {
  params: object({
    id: string({
      required_error: 'Post ID is required'
    })
  })
};

export const createPostSchema = object({
  ...payload
});

export const updatePostSchema = object({
  ...params,
  ...payload
});

export const deletePostSchema = object({
  ...params
});

export const getPostSchema = object({
  ...params
});

export type createPostInput = TypeOf<typeof createPostSchema>;
export type updatePostInput = TypeOf<typeof updatePostSchema>;
export type deletePostInput = TypeOf<typeof deletePostSchema>;
export type getPostInput = TypeOf<typeof getPostSchema>;
