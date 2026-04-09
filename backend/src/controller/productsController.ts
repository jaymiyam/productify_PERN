import type { Request, Response } from 'express';
import { getAuth } from '@clerk/express';
import * as queries from '../db/queries';

// TODO: properly type all controller methods

// get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// get product by id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const product = await queries.getProductById(id);

    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get product' });
  }
};

// get all products for a specific user (protected)
export const getProductsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorised' });

    const products = await queries.getProductsByUserId(userId);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get products' });
  }
};

// create new product (protected)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorised' });

    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
      res
        .status(400)
        .json({ error: 'Title, description, and imageUrl are required' });
      return;
    }

    const newProduct = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create products' });
  }
};

// update a product (protected)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorised' });

    const { id } = req.params as { id: string };
    const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: 'You can only update your own products' });
      return;
    }

    const updatedProduct = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update products' });
  }
};

// delete a product (protected)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorised' });

    const { id } = req.params as { id: string };

    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: 'You can only delete your own products' });
      return;
    }

    await queries.deleteProduct(id);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete products' });
  }
};
