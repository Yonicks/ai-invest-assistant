// apps/host/src/app/App.tsx
import React, { Suspense } from 'react';
import {  Routes, Route } from 'react-router-dom';

const DashboardPage = React.lazy(() => import('dashboard/DashboardPage'));

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<h1>Welcome to AI-Invest-Assistant</h1>} />
        <Route
          path="/dashboard/*"
          element={
            <Suspense fallback={<div>Loading dashboard…</div>}>
              <DashboardPage />
            </Suspense>
          }
        />
      </Routes>
  );
}
