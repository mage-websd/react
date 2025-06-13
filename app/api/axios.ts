import axios, { AxiosError, HttpStatusCode, type InternalAxiosRequestConfig } from 'axios';
import config from '~/config';
import { getToken, removeDataLogout, saveToken } from '~/lib/auth';
import type { TFunction } from 'i18next';
import { toast } from 'sonner';
import type React from 'react';

interface IHandleError {
  t: TFunction;
  message?: Record<string, React.ReactNode>;
}

const api = axios.create({
  baseURL: (config.VITE_BASE_API ?? '') + '/api/',
  proxy: false,
  responseType: 'json',
});

api.interceptors.request.use((configAxios: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const newConfig: InternalAxiosRequestConfig = { ...configAxios };
  const token = getToken();
  if (token) {
    newConfig.headers.set('Authorization', `Bearer ${token}`);
  }

  return newConfig;
});

api.interceptors.response.use(
  (response) => {
    if (response.data && response.headers['content-type'].includes('application/json')) {
      if (response.data?.tokens?.access) {
        saveToken(response.data.tokens.access);
      }
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

export function handleError(error: AxiosError, {t, message}: IHandleError) {
  if (!error.response) {
    const m = t('errors.500.notification', {ns: 'common'});
    toast.error(m);
    return m;
  }

  if (message && message[error.response.status]) {
    toast.error(message[error.response.status]);
    return message[error.response.status];
  }

  if (message && message.default) {
    toast.error(message.default);
    return message.default;
  }

  if (error.response.status === HttpStatusCode.InternalServerError) {
    const m = t('errors.500.notification', {ns: 'common'});
    toast.error(m);
    return m;
  }

  if (error.response.status === HttpStatusCode.NotFound) {
    const m = t('errors.404.notification', {ns: 'common'});
    toast.error(m);
    return m;
  }

  if (error.response.status === HttpStatusCode.Unauthorized) {
    removeDataLogout();
    window.location.href = '/';
  }
}

// TODO: test mock status, remove in produciton
export function fakeApi<T = any>(
  status: HttpStatusCode,
  data?: any,
  delay = 500
): Promise<{ data: T }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === HttpStatusCode.Ok) {
        return resolve({ data });
      }

      const error = AxiosError.from(
        {
          response: {
            status,
            data,
          },
        }
      );
      
      reject(error);
    }, delay);
  });
}
