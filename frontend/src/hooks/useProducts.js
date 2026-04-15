import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createProduct,
  getAllProducts,
  getMyProducts,
  updateProduct,
  getProductById,
  deleteProduct,
} from '../lib/api';

export const useCreateProduct = () => {
  return useMutation({ mutationFn: createProduct });
};

export const useGetAllProducts = () => {
  return useQuery({ queryKey: ['products'], queryFn: getAllProducts });
};

export const useGetMyProducts = () => {
  return useQuery({ queryKey: ['myProducts'], queryFn: getMyProducts });
};

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
    },
  });
};
