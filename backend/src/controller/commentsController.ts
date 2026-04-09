import type { Request, Response } from 'express';
import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';

// TODO: properly type all controller methods

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { content } = req.body;
    const { productId } = req.params as { productId: string };

    if (!content.trim()) {
      return res.status(400).json({ error: 'Comment content is required' });
    }
    const product = await queries.getProductById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const comment = await queries.createComment({
      content,
      productId,
      userId,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { commentId } = req.params as { commentId: string };

    const existingComment = await queries.getCommentById(commentId);
    if (!existingComment) {
      return res.status(404).json({ error: 'comment not found' });
    }

    if (existingComment.userId !== userId) {
      return res
        .status(403)
        .json({ error: 'not authorised to delete this comment' });
    }

    await queries.deleteComment(commentId);
    res.status(200).json({ message: 'comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
