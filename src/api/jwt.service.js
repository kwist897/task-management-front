const ID_TOKEN_KEY = "id_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = (token) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyTokens = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const saveRefreshToken = (token) => {
  window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = () => {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const saveTokens = (accessToken, refreshToken) => {
  saveToken(accessToken);
  saveRefreshToken(refreshToken);
};

export default {
  getToken,
  saveToken,
  destroyTokens,
  saveRefreshToken,
  getRefreshToken,
  saveTokens,
};
