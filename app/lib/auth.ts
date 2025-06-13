import { KEY_LOCAL_STORAGE } from '~/constans';

export const getToken = () => {
  const token = localStorage.getItem(KEY_LOCAL_STORAGE.ACCESS_TOKEN);
  return token;
};

export const saveToken = (token: string) => {
  localStorage.setItem(KEY_LOCAL_STORAGE.ACCESS_TOKEN, token);
};

export const removeDataLogout = () => {
  localStorage.removeItem(KEY_LOCAL_STORAGE.ACCESS_TOKEN);
};
