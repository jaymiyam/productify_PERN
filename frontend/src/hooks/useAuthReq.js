// axios interceptors are functions triggered before requests are sent or after responses are received
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import api from '../lib/axios';

let isInterceptorRegistered = false;

// this is a hook to attached clerk auth token to api requests
const useAuthReq = () => {
  const { isSignedIn, isLoaded, getToken } = useAuth();

  useEffect(() => {
    // avoid duplicated interceptor calls
    if (isInterceptorRegistered) return;

    // create an interceptor on requests to our api
    const interceptor = api.interceptors.request.use(async (config) => {
      if (isSignedIn) {
        const token = await getToken();

        // if clerk signed in and JWT token exists, add token to request body
        if (token) {
          // config equals to the config object we send as 2nd param on fetch: fetch(url, {configs})
          // headers.Authorization is one of the configs
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      //   return updated config to axios
      return config;
    });

    isInterceptorRegistered = true;

    // useEffect clean up method
    return () => {
      api.interceptors.request.eject(interceptor);
      isInterceptorRegistered = false;
    };
  }, [isSignedIn, getToken]);

  return { isSignedIn, isClerkLoaded: isLoaded };
};

export default useAuthReq;
