import { db } from './index';
import { users, products, comments } from './schema';
import type {
  NewUser,
  NewComment,
  NewProduct,
  User,
  Product,
  Comment,
} from './schema';
import { eq } from 'drizzle-orm';

// user queries
export const createUser = async (data: NewUser) => {
  const [insertedUser]: User[] = await db
    .insert(users)
    .values(data)
    .returning();
  return insertedUser;
};

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({ where: eq(users.id, id) });
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
  const existingUser = await getUserById(id);
  if (!existingUser) {
    throw new Error(`User with id ${id} does not exist`);
  }

  const [updatedUser]: User[] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return updatedUser;
};

export const upsertUser = async (data: NewUser) => {
  const [upsertedUser]: User[] = await db
    .insert(users)
    .values(data)
    .onConflictDoUpdate({
      target: users.id,
      set: data,
    })
    .returning();
  return upsertedUser;
};

// product queries
export const createProduct = async (data: NewProduct) => {
  const [insertedProduct]: Product[] = await db
    .insert(products)
    .values(data)
    .returning();
  return insertedProduct;
};

export const getAllProducts = async () => {
  return await db.query.products.findMany({
    with: {
      user: true,
    },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
};

export const getProductById = async (id: string) => {
  return await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      // also get the user data according to relations set-up
      user: true,
      //   also get the comments data according to relations
      comments: {
        // within each comment, also get the user data
        with: { user: true },
        // sort comments from recent, using desc on comments.createAt
        orderBy: (comments, { desc }) => [desc(comments.createdAt)],
      },
    },
  });
};

export const getProductsByUserId = async (userId: string) => {
  return await db.query.products.findMany({
    // where => matching condition
    where: eq(products.userId, userId),
    // with => get related data
    with: {
      user: true,
    },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
};

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    throw new Error(`Product with id ${id} does not exist.`);
  }

  const [updatedProduct]: Product[] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
  return updatedProduct;
};

export const deleteProduct = async (id: string) => {
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    throw new Error(`Product with id ${id} does not exist.`);
  }

  const [deletedProduct] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();
  return deletedProduct;
};

// comment queries
export const createComment = async (data: NewComment) => {
  const [insertedComment]: Comment[] = await db
    .insert(comments)
    .values(data)
    .returning();
  return insertedComment;
};

export const getCommentById = async (id: string) => {
  return await db.query.comments.findFirst({
    where: eq(comments.id, id),
    with: {
      user: true,
    },
  });
};

export const deleteComment = async (id: string) => {
  const existingComment = await getCommentById(id);
  if (!existingComment) {
    throw new Error(`Comment with id ${id} not found`);
  }

  const [deletedComment]: Comment[] = await db
    .delete(comments)
    .where(eq(comments.id, id))
    .returning();
  return deletedComment;
};
