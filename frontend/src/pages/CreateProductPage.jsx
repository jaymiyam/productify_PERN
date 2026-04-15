import {
  SparklesIcon,
  TypeIcon,
  ArrowLeftIcon,
  ImageIcon,
  FileTextIcon,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useCreateProduct } from '../hooks/useProducts';

const CreateProductPage = () => {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct.mutate(formData, {
      onSuccess: () => navigate('/'),
    });
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* BACK BREADCRUMB */}
      <Link to="/" className="btn btn-ghost btn-sm gap-1 mb-4">
        <ArrowLeftIcon className="size-4" />
        <span>Back</span>
      </Link>

      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">
            <SparklesIcon className="size-5 text-primary" />
            <span>New Product</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="form-control">
              <label
                htmlFor="title"
                className="input input-bordered flex items-center gap-2 bg-base-200"
              >
                <TypeIcon className="size-4 text-base-content/50" />
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Product title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  className="grow"
                />
                <span className="sr-only">Product title</span>
              </label>
            </div>
            <div className="form-control">
              <label
                htmlFor="image"
                className="input input-bordered flex items-center gap-2 bg-base-200"
              >
                <ImageIcon className="size-4 text-base-content/50" />
                <input
                  type="url"
                  name="image"
                  id="image"
                  placeholder="Product image"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      imageUrl: e.target.value,
                    }))
                  }
                  required
                  className="grow"
                />
                <span className="sr-only">Product image</span>
              </label>
            </div>
            {/* IMG PREVIEW */}
            {formData.imageUrl && (
              <div className="rounded-box overflow-hidden">
                <img
                  src={formData.imageUrl}
                  alt={formData.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </div>
            )}

            <div className="form-control">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                <textarea
                  name="description"
                  placeholder="Description"
                  className="grow bg-transparent resize-none focus:outline-none min-h-24"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                />
                <label htmlFor="description" className="sr-only">
                  Product description
                </label>
              </div>
            </div>

            {/* ERROR DISPLAY */}
            {createProduct.isError && (
              <div role="alert" className="alert alert-error alert-sm">
                <span>Failed to create. Please try again.</span>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={createProduct.isPending}
              className="btn btn-primary w-full"
            >
              {createProduct.isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                <span>Create Product</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
