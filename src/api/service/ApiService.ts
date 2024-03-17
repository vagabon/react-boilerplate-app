import { ID, JSON } from '@vagabond-inc/react-boilerplate-md';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const ApiService = {
  get: <T>(baseUrl: string, endPoint: string): Promise<T> => {
    return axios.get(encodeURI(baseUrl + endPoint)).then(
      (response: AxiosResponse) => {
        return ApiService.returnPromise<T>(response);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  },

  put: <T>(baseUrl: string, endPoint: string, data: T): Promise<T> => {
    return axios.put(encodeURI(baseUrl + endPoint), data).then(
      (response: AxiosResponse) => {
        return ApiService.returnPromise<T>(response);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  },

  post: <T>(
    baseUrl: string,
    endPoint: string,
    data: T,
    config: JSON = {
      'Content-Type': 'application/json',
    },
  ): Promise<T> => {
    return axios.post(encodeURI(baseUrl + endPoint), data, config).then(
      (response: AxiosResponse) => {
        return ApiService.returnPromise<T>(response);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  },

  patch: <T>(baseUrl: string, endPoint: string, data: T): Promise<T> => {
    return axios.patch(encodeURI(baseUrl + endPoint), data).then(
      (response: AxiosResponse) => {
        return ApiService.returnPromise<T>(response);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  },

  delete: <T>(baseUrl: string, endPoint: string): Promise<T> => {
    return axios.delete(encodeURI(baseUrl + endPoint)).then(
      (response: AxiosResponse) => {
        return ApiService.returnPromise<T>(response);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  },

  returnPromise: <T>(response: AxiosResponse<T, AxiosRequestConfig>): Promise<T> => {
    if (response.data) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },

  findById: <T>(baseUrl: string, endPoint: string, id: ID): Promise<T> => {
    return ApiService.get<T>(baseUrl, endPoint + '/' + id).then(
      (data: T) => {
        return Promise.resolve(data);
      },
      () => {
        return Promise.resolve({} as T);
      },
    );
  },

  findBy: <T>(
    baseUrl: string,
    endPoint: string,
    champs: string,
    values: string,
    first: number,
    max: number,
    orderField: string,
    order: string,
  ) => {
    const orderType: string = order === 'asc' ? '' : 'Desc';
    const orderConst: string = orderField ? '>>' + orderField + orderType : '';
    const champsComplete = champs + orderConst;
    return ApiService.get<T>(
      baseUrl,
      endPoint + '?fields=' + champsComplete + '&values=' + values + '&first=' + first + '&max=' + max,
    ).then(
      (data: T) => {
        return Promise.resolve(data);
      },
      () => {
        return Promise.resolve({} as T);
      },
    );
  },

  countBy: (baseUrl: string, endPoint: string, champs: string, values: string) => {
    return ApiService.get<{ count: number }>(baseUrl, endPoint + '?fields=' + champs + '&values=' + values).then(
      (data: { count: number }) => {
        return Promise.resolve(data.count);
      },
      () => {
        return Promise.resolve(0);
      },
    );
  },
};
