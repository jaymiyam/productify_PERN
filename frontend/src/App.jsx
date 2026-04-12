import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import useUserSync from './hooks/useUserSync';
import useAuthReq from './hooks/useAuthReq';

const App = () => {
  // initiate axios interceptors for attaching clerk auth token
  const { isSignedIn, isClerkLoaded } = useAuthReq();
  // initiate the user syncing hook right when app is loaded
  useUserSync();

  // do not render app unless clerk finishes loading
  if (!isClerkLoaded) return null;
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={isSignedIn ? <ProfilePage /> : <Navigate to="/" />}
          />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route
            path="/create"
            element={isSignedIn ? <CreateProductPage /> : <Navigate to="/" />}
          />
          <Route
            path="/:id/edit"
            element={isSignedIn ? <EditProductPage /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
