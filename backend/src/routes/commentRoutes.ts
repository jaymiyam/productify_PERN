import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { createComment, deleteComment } from '../controller/commentsController';

const commentRouter = Router();

commentRouter.post('/:productId', requireAuth(), createComment);
commentRouter.delete('/:commentId', requireAuth(), deleteComment);

export default commentRouter;
