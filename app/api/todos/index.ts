import type { TFunction } from "i18next";
import api, { fakeApi, handleError } from "../axios";
import type { AxiosError } from "axios";

export const getTodos = async (t: TFunction) => {
  try {
    const a = await api.get("/todos");
    return a.data;
  } catch (error) {
    handleError(error as AxiosError, { t });
  }
};

export const getTodosId = async (t: TFunction, id: number) => {
  try {
    const a = await api.get(`/todos/${id}`);
    return a.data;
  } catch (error) {
    handleError(error as AxiosError, { t });
  }
};

export const get404 = async (t: TFunction) => {
  try {
    const a = await api.get("/404");
    return a.data;
  } catch (error) {
    handleError(error as AxiosError, { t, message: {
      404: t('errors.404.notification', {ns: 'common'}),
      500: t('errors.500.notification', {ns: 'common'}),
      401: t('errors.401.notification', {ns: 'common'}),
    } });
  }
};

export const get500 = async (t: TFunction) => {
  try {
    const a = await fakeApi(500);
    return a;
  } catch (error) {
    handleError(error as AxiosError, { t });
  }
};

export const get401 = async (t: TFunction) => {
  try {
    const a = await fakeApi(401);
    return a;
  } catch (error) {
    handleError(error as AxiosError, { t });
  }
};
