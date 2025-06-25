import  { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { HostWelcome } from './components/HostWelcome';
import { ErrorBoundary } from './components/ErrorBoundary';

const DashboardPage = lazy(() => import('dashboard/DashboardPage'));
const UploadPage = lazy(() => import('upload/UploadPage'));



export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-slate-100">
      <NavBar />
      <main className="flex-1 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-3xl">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-white rounded-2xl shadow-xl p-10 mt-8 flex flex-col items-center">
                  <HostWelcome />
                  <div className="mt-6 text-center">
                    <h2 className="text-xl font-bold text-blue-600 mb-2">
                      👋 Welcome to the AI Invest Assistant Host App
                    </h2>
                    <p className="text-gray-700">
                      Use the navigation bar to access Dashboard or Upload.
                    </p>
                  </div>
                </div>
              }
            />
            <Route
              path="dashboard/*"
              element={
                <ErrorBoundary>
                  <Suspense
                    fallback={
                      <div className="text-blue-700 text-lg mt-20 text-center">
                        Loading dashboard…
                      </div>
                    }
                  >
                    <DashboardPage />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="upload/*"
              element={
                <ErrorBoundary>
                  <Suspense
                    fallback={
                      <div className="text-green-700 text-lg mt-20 text-center">
                        Loading upload…
                      </div>
                    }
                  >
                    <UploadPage />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          </Routes>
        </div>
      </main>
      <footer className="bg-blue-50 py-3 text-center text-sm text-blue-400 shadow-inner">
        &copy; {new Date().getFullYear()} AI Invest Assistant – Host App
      </footer>
    </div>
  );
}
