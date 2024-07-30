import { AUTH_TOKEN_STORAGE } from "./storageConfig";

export async function storageAuthTokenSave(token) {
  localStorage.setItem(AUTH_TOKEN_STORAGE, token);
}

export async function storageAuthTokenGet() {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE);

  return token;
}

export async function storageAuthTokenRemove() {
  localStorage.removeItem(AUTH_TOKEN_STORAGE);
}
