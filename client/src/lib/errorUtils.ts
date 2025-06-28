import { TRPCClientError } from "@trpc/client";
import type { AppRouter } from "@server/routes";
import toast from "react-hot-toast";

// --- Constants for User-Facing Messages ---

const ERROR_MESSAGES = {
  NETWORK: "Unable to connect to the server. Please check your internet connection and try again.",
  SERVER_ERROR: "Something went wrong on our end. Please try again in a moment.",
  UNAUTHORIZED: "You need to log in to access this feature.",
  FORBIDDEN: "You don't have permission to perform this action.",
  NOT_FOUND: "The requested information could not be found.",
  BAD_REQUEST: "There was an issue with your request. Please check your input and try again.",
  TIMEOUT: "The request took too long. Please try again.",
  RATE_LIMITED: "Too many requests. Please wait a moment before trying again.",
  GENERIC: "An unexpected error occurred. Please try again.",
} as const;

// --- Mappings for Specific Error Types ---

const TRPC_ERROR_MAP: Record<string, { message: string; retryable: boolean; severity: "error" | "warning" }> = {
  NOT_FOUND: { message: ERROR_MESSAGES.NOT_FOUND, retryable: false, severity: "error" },
  UNAUTHORIZED: { message: ERROR_MESSAGES.UNAUTHORIZED, retryable: false, severity: "error" },
  FORBIDDEN: { message: ERROR_MESSAGES.FORBIDDEN, retryable: false, severity: "error" },
  BAD_REQUEST: { message: ERROR_MESSAGES.BAD_REQUEST, retryable: false, severity: "error" },
  INTERNAL_SERVER_ERROR: { message: ERROR_MESSAGES.SERVER_ERROR, retryable: true, severity: "warning" },
  TIMEOUT: { message: ERROR_MESSAGES.TIMEOUT, retryable: true, severity: "warning" },
  TOO_MANY_REQUESTS: { message: ERROR_MESSAGES.RATE_LIMITED, retryable: true, severity: "warning" },
};

// --- Custom Error Class ---

interface AppErrorOptions {
  message?: string;
  cause?: unknown;
  code?: string;
  statusCode?: number;
  isNetworkError?: boolean;
  isRetryable?: boolean;
  userMessage?: string;
  severity?: "error" | "warning";
}

/**
 * A custom error class for consistent error handling across the application.
 * It ensures that every error has a stack trace, a user-friendly message,
 * and other structured properties for logging and UI feedback.
 */
export class AppError extends Error {
  public readonly cause?: unknown;
  public readonly code?: string;
  public readonly statusCode?: number;
  public readonly isNetworkError: boolean;
  public readonly isRetryable: boolean;
  public readonly userMessage: string;
  public readonly severity: "error" | "warning";

  constructor(options: AppErrorOptions = {}) {
    super(options.message ?? "An unexpected error occurred.");
    this.name = "AppError";
    this.cause = options.cause;
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.isNetworkError = options.isNetworkError ?? false;
    this.isRetryable = options.isRetryable ?? false;
    this.userMessage = options.userMessage ?? ERROR_MESSAGES.GENERIC;
    this.severity = options.severity ?? "error";

    // Ensure a stack trace is available
    if (options.cause instanceof Error && options.cause.stack) {
      this.stack = options.cause.stack;
    } else if (!this.stack) {
      Error.captureStackTrace?.(this, this.constructor);
    }
  }
}

// --- Error Normalization Logic ---

function fromTRPCClientError(error: TRPCClientError<AppRouter>): AppError {
  const code = error.shape?.code;
  const statusCode = error.data?.httpStatus;
  const errorConfig = code ? TRPC_ERROR_MAP[code] : null;

  return new AppError({
    message: error.message,
    cause: error,
    code: code?.toString(),
    statusCode,
    isRetryable: errorConfig?.retryable ?? false,
    userMessage: errorConfig?.message ?? error.message ?? ERROR_MESSAGES.GENERIC,
    severity: errorConfig?.severity ?? "error",
  });
}

function fromFetchError(error: TypeError): AppError {
  return new AppError({
    message: error.message,
    cause: error,
    isNetworkError: true,
    isRetryable: true,
    userMessage: ERROR_MESSAGES.NETWORK,
    severity: "warning",
  });
}

function fromGenericError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  const message = error instanceof Error ? error.message : String(error);
  return new AppError({
    message,
    cause: error,
    userMessage: ERROR_MESSAGES.GENERIC,
    severity: "error",
  });
}

/**
 * Normalizes an unknown error into an `AppError` instance.
 * This function guarantees a consistent, typed error object to work with.
 * @param error The error to normalize, typically from a catch block.
 * @returns An instance of `AppError`.
 */
export function normalizeError(error: unknown): AppError {
  if (error instanceof TRPCClientError) {
    return fromTRPCClientError(error);
  }

  if (error instanceof TypeError && error.message.toLowerCase().includes("fetch")) {
    return fromFetchError(error);
  }

  return fromGenericError(error);
}

// --- Centralized Logging ---

async function sendToCentralizedLogger(error: AppError, errorSource: string): Promise<void> {
  const payload = {
    errorSource,
    message: error.message,
    stack: error.stack,
    severity: error.severity,
    isRetryable: error.isRetryable,
    isNetworkError: error.isNetworkError,
    code: error.code,
    statusCode: error.statusCode,
    userMessage: error.userMessage,
    cause: error.cause,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "N/A",
    url: typeof window !== "undefined" ? window.location.href : "N/A",
  };

  if (import.meta.env.DEV) {
    console.log("[CENTRALIZED_LOGGER]", payload);
  }

  // TODO: Implement actual centralized logging service integration (e.g., Sentry, Datadog)
}

function displayToast(error: AppError): void {
  if (error.severity === "warning") {
    toast.error(error.userMessage, {
      icon: "⚠️",
      style: {
        background: "#f59e0b",
        color: "#fff",
      },
    });
  } else {
    toast.error(error.userMessage);
  }
}

// --- Public Utility Functions ---

/**
 * Logs a normalized error, sends it to a centralized logging service, and optionally displays a toast.
 * @param errorSource A string providing context for where the error occurred (e.g., "tRPC", "ComponentX").
 * @param error The error to log.
 * @param options Optional parameters.
 * @param options.displayToast If true, a toast notification will be displayed to the user.
 */
export async function logError(
  errorSource: string,
  error: unknown,
  options?: { displayToast?: boolean },
): Promise<void> {
  const appError = normalizeError(error);

  // Always log to console in development for immediate feedback
  if (import.meta.env.DEV) {
    console.error(`[${errorSource}] Error:`, appError);
  }

  // Display toast notification if requested
  if (options?.displayToast) {
    displayToast(appError);
  }

  // Only send errors of severity "error" to the centralized logger
  if (appError.severity === "error") {
    try {
      await sendToCentralizedLogger(appError, errorSource);
    } catch (loggerError) {
      // Fail silently for logging errors to avoid infinite loops
      if (import.meta.env.DEV) {
        console.warn("Failed to send error to centralized logger:", loggerError);
      }
    }
  }
}
