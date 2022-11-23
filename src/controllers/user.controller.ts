import { Request, Response } from 'express';
import { omit } from 'lodash';

import logger from '../utils/logger';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../services/user.service';
import { createUserSessionHandler } from './session.controller';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
  try {
    const user = await createUser(req.body); // call create user service
    return res.status(201).send(omit(user, 'password'));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
