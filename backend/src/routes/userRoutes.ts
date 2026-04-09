import { requireAuth } from '@clerk/express';
import { Router } from 'express';
import { syncUser } from '../controller/usersController';

const userRouter = Router();

userRouter.post('/sync', requireAuth(), syncUser);

export default userRouter;
