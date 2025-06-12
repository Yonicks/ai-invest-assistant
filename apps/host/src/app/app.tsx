import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

const DashboardPage = React.lazy(() => import('dashboard/DashboardPage'));
const UploadPage = React.lazy(() => import('upload/UploadPage'));

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Welcome to AI-Invest-Assistant</h1>} />
        <Route
          path="dashboard/*"
          element={
            <Suspense fallback={<div>Loading dashboard…</div>}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path="upload/*"
          element={
            <Suspense fallback={<div>Loading upload…</div>}>
              <UploadPage />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
