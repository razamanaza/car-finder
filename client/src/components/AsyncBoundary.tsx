import { Suspense } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { logError, normalizeError } from "@/lib/errorUtils";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { userMessage, isRetryable, stack } = normalizeError(error);
  return (
    <div className="p-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h2 className="text-red-800 font-semibold mb-2">{userMessage}</h2>
        {stack && (
          <div className="text-sm text-red-700 mb-4">
            <details>
              <summary className="cursor-pointer">Details</summary>
              <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto max-h-48">{stack}</pre>
            </details>
          </div>
        )}
        {isRetryable && (
          <button
            onClick={resetErrorBoundary}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

const DefaultLoadingFallback = () => (
  <div className="p-4">
    <h1 className="text-xl font-semibold mb-2">Loading data ...</h1>
    <div className="animate-pulse bg-gray-200 h-4 w-full rounded"></div>
  </div>
);

interface AsyncBoundaryProps {
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ComponentType<FallbackProps>;
}

export function AsyncBoundary({
  children,
  loadingFallback = <DefaultLoadingFallback />,
  errorFallback = ErrorFallback,
}: AsyncBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  const handleError = (error: Error) => {
    logError("AsyncBoundary", error, { displayToast: true });
  };

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={errorFallback} onError={handleError}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
