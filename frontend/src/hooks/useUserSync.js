import { useUser, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { syncUser } from '../lib/api';

const useUserSync = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  const {
    mutate: syncUserMutation,
    isPending,
    isSuccess,
  } = useMutation({ mutationFn: syncUser });

  //   useEffect dependencies on the states ensure reactivity of the hook and keep db users up to date with clerk
  useEffect(() => {
    // !isSuccess means this mutation has not been ran successfully yet in this session
    if (isSignedIn && user && !isPending && !isSuccess) {
      // backend method is expecting email, name, imageUrl in req.body
      syncUserMutation({
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName,
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn, isPending, isSuccess, user, syncUserMutation]);

  //   isSuccess returned from mutation means query to sync user to DB was successful
  return { isSynced: isSuccess };
};

export default useUserSync;
