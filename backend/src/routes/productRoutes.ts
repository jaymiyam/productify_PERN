import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByUserId,
} from '../controller/productsController';

const productRouter = Router();

// get all products
productRouter.get('/', getAllProducts);
// get all products for a specific user (protected)
productRouter.get('/myproducts', requireAuth(), getProductsByUserId);
// get product by id
productRouter.get('/:id', getProductById);
// create new product (protected)
productRouter.post('/', requireAuth(), createProduct);
// update a product (protected)
productRouter.put('/:id', requireAuth(), updateProduct);
// delete a product (protected)
productRouter.delete('/:id', requireAuth(), deleteProduct);

export default productRouter;
