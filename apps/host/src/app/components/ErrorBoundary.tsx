// ErrorBoundary must be a class component in React
import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // componentDidCatch(error, info) {
  //   // Optional: send error to error reporting service
  //   // console.error('ErrorBoundary caught error', error, info);
  // }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    // Optionally: reload or navigate, or let Suspense retry
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-8 mt-12 shadow-lg text-center">
          <div className="text-2xl font-bold mb-2">
            Failed to load remote app 😢
          </div>
          <div className="mb-2">
            {this.state.error?.message ||
              'Please try refreshing, or check your network.'}
          </div>
          <button
            onClick={this.handleReset}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}