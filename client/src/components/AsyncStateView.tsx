import React from "react";

interface AsyncStateViewProps<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | undefined;
  onRetry: () => void;
  loadingView?: React.ReactNode;
  errorView?: React.ReactNode;
  successView: (data: T) => React.ReactNode;
}

export function AsyncStateView<T>({
  isLoading,
  isError,
  data,
  onRetry,
  loadingView,
  errorView,
  successView,
}: AsyncStateViewProps<T>) {
  if (isLoading) {
    return (
      loadingView || (
        <div className="p-4">
          <h1 className="text-xl font-semibold mb-2">Loading data ...</h1>
          <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
        </div>
      )
    );
  }

  if (isError) {
    return (
      errorView || (
        <div className="p-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-red-800 font-semibold mb-2">Connection Error</h2>
            <p className="text-red-600 mb-3">Unable to connect to the server. Please check your connection.</p>
            <button
              onClick={onRetry}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    );
  }

  if (data) {
    return <>{successView(data)}</>;
  }

  return null;
}
