import { Link, Outlet } from 'react-router-dom';

export const HostWelcome = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex flex-col">
        <header className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-blue-700 drop-shadow-sm tracking-tight">
            AI Invest Assistant{' '}
            <span className="text-lg font-normal text-blue-400">Host App</span>
          </h1>
          <nav className="flex gap-6 text-blue-600 font-medium">
            <Link className="hover:underline hover:text-blue-900" to="/">
              Home
            </Link>
            <Link
              className="hover:underline hover:text-blue-900"
              to="/ai-invest-assistant/"
            >
              Upload
            </Link>
            {/* Add more links to your microfrontends/pages as needed */}
          </nav>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="bg-white/70 rounded-2xl shadow-2xl p-10 w-full max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              🚀 Welcome to the AI Invest Assistant!
            </h2>
            <p className="text-gray-700 mb-6">
              This is the{' '}
              <span className="font-semibold text-blue-500">host app</span>.
              <br />
              Use the navigation above to try features from different
              microfrontends.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/ai-invest-assistant/"
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition"
              >
                Go to Upload Page
              </Link>
              {/* Add more action buttons or info here if you want */}
            </div>
          </div>
          <div className="mt-12 w-full max-w-4xl">
            {/* This is where your federated routes render */}
            <Outlet />
          </div>
        </main>

        <footer className="bg-blue-50 py-3 text-center text-sm text-blue-400">
          &copy; {new Date().getFullYear()} AI Invest Assistant – Host App
        </footer>
      </div>
    </>
  );
};
