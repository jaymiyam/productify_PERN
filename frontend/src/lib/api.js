import api from './axios';

// creating frontend methods calling axios to make http requests to our backend endpoints
// users endpoint
export const syncUser = async (userData) => {
  const { data } = await api.post('/users/sync', userData);
  return data;
};

// products endpoint
export const getAllProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const getMyProducts = async () => {
  const { data } = await api.get('products/myproducts');
  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProduct = async (productData) => {
  const { data } = await api.post('/products', productData);
  return data;
};

// question: why spreading with id instead of taking 2 arguments?
export const updateProduct = async ({ id, ...productData }) => {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

// comments endpoint
export const createComment = async ({ productId, content }) => {
  const { data } = await api.post(`/comments/${productId}`, { content });
  return data;
};

export const deleteComment = async ({ commentId }) => {
  const { data } = await api.delete(`comments/${commentId}`);
  return data;
};
