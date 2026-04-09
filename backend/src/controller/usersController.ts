import type { Request, Response } from 'express';
import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';

// sync the clerk authorized user information to user database
export const syncUser = async (req: Request, res: Response) => {
  try {
    // get the userid from auth object
    const { userId } = getAuth(req);
    // if no user id throw error
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // get the other user fields from request body
    const { email, name, imageUrl } = req.body;
    // validation the fields
    if (!email.trim() || !name.trim() || !imageUrl.trim()) {
      return res
        .status(400)
        .json({ error: 'Email, name and image are required' });
    }
    // form a new user object and query to create or update user
    const user = await queries.upsertUser({
      id: userId,
      email,
      name,
      imageUrl,
    });
    // return successful status to the route request
    res.status(200).json(user);
  } catch (error) {
    // if error, return error status to the route
    console.log(error);
    res.status(500).json({ error: 'Failed to sync user' });
  }
};
