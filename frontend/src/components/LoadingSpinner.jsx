import { LoaderIcon } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <LoaderIcon className="size-10 text-primary animate-spin" />
      <p className="text-sm text-base-content/50">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
