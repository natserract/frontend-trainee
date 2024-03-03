import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useRef, useEffect, useMemo } from "react";

const fetchClient = () => {
  const instance = axios.create({
    baseURL: "https://",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor to add authorization token to headers, rejects errors
  instance.interceptors.request.use(
    async (config) => {
      // config.headers.Authorization = `Bearer ${auth.getToken()}`;

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add a response interceptor to return the response or handle the error
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        // auth.clearAppStorage();
        window.location.reload();
      }

      throw error;
    }
  );

  return instance;
};

type FetchClient = {
  get: <TData = any, R = AxiosResponse<TData>, TSend = any>(
    url: string,
    config?: AxiosRequestConfig<TSend>
  ) => Promise<R>;
  put: <TData = any, R = AxiosResponse<TData>, TSend = any>(
    url: string,
    data?: TSend,
    config?: AxiosRequestConfig<TSend>
  ) => Promise<R>;
  post: <TData = any, R = AxiosResponse<TData>, TSend = any>(
    url: string,
    data?: TSend,
    config?: AxiosRequestConfig<TSend>
  ) => Promise<R>;
  del: <TData = any, R = AxiosResponse<TData>, TSend = any>(
    url: string,
    config?: AxiosRequestConfig<TSend>
  ) => Promise<R>;
};

const getFetchClient = (
  defaultOptions: AxiosRequestConfig = {}
): FetchClient => {
  const instance = fetchClient();
  return {
    get: (url, config) =>
      instance.get(url, {
        ...defaultOptions,
        ...config,
      }),
    put: (url, data, config) =>
      instance.put(url, data, { ...defaultOptions, ...config }),
    post: (url, data, config) =>
      instance.post(url, data, { ...defaultOptions, ...config }),
    del: (url, config) =>
      instance.delete(url, { ...defaultOptions, ...config }),
  };
};

export function useFetchClient() {
  const controller = useRef<AbortController | null>(null);

  if (controller.current === null) {
    controller.current = new AbortController();
  }

  useEffect(() => {
    return () => {
      controller.current!.abort();
    };
  }, []);

  return useMemo(
    () =>
      getFetchClient({
        signal: controller.current!.signal,
      }),
    []
  );
}
