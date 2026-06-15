export const FAKE_AUTH = {
  email: "12345",
  password: "12345",
} as const;

export const AUTH_STORAGE_KEY = "zelos_authenticated";

export function validateCredentials(email: string, password: string): boolean {
  return email.trim() === FAKE_AUTH.email && password === FAKE_AUTH.password;
}

export function setAuthenticated(): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function clearAuthenticated(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
