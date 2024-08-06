// import { AUTH_TOKEN_STORAGE } from "./storageConfig";

// export async function storageAuthTokenSave(token) {
//   localStorage.setItem(AUTH_TOKEN_STORAGE, token);
// }

// export async function storageAuthTokenGet() {
//   const token = localStorage.getItem(AUTH_TOKEN_STORAGE);

//   return token;
// }

// export async function storageAuthTokenRemove() {
//   localStorage.removeItem(AUTH_TOKEN_STORAGE);
// }


import { AUTH_TOKEN_STORAGE } from "./storageConfig";

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
}
export async function storageAuthTokenSave({token, refresh_token}: StorageAuthTokenProps) {
  await localStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({token, refresh_token}) );
}

export async function storageAuthTokenGet() {
  const response = await localStorage.getItem(AUTH_TOKEN_STORAGE);

  const {token, refresh_token}: StorageAuthTokenProps = response ? JSON.parse(response) : {}

  return {token, refresh_token};
}

export async function storageAuthTokenRemove() {
  await localStorage.removeItem(AUTH_TOKEN_STORAGE);
}
