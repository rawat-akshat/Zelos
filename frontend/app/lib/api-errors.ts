import { ApiError } from "./api";

/** Map API / network errors to user-friendly copy. */
export function formatApiError(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 0) {
      return err.message;
    }
    if (err.status === 408) {
      return "That took too long. Check your connection and try again.";
    }
    if (err.status === 401) {
      return "Your session expired. Please sign in again.";
    }
    if (err.status === 403) {
      return "You don't have access to that.";
    }
    if (err.status === 404) {
      return "We couldn't find that. It may have been deleted.";
    }
    if (err.status >= 500) {
      return "Something went wrong on our side. Please try again in a moment.";
    }
    return err.message || "Something went wrong. Please try again.";
  }

  if (err instanceof DOMException && err.name === "AbortError") {
    return "Request timed out. Check your connection and try again.";
  }

  if (err instanceof TypeError) {
    return "Could not reach the server. Check your connection or try again later.";
  }

  if (err instanceof Error && err.message) {
    return err.message;
  }

  return "Something went wrong. Please try again.";
}
