import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

import { ENDPOINTS } from "../constants/endpoints";
import { API_HOST } from "../config";

type ObjectValue<T> = T[keyof T];
type Endpoint = ObjectValue<typeof ENDPOINTS>;

export class BaseClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_HOST,
    });

    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => config,
      (error: AxiosError<string>) => Promise.reject(error),
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<string>) => Promise.reject(error),
    );
  }

  async getResource<T>(
    endpoint: string,
    identifier?: string | number,
  ): Promise<T> {
    return (
      await this.api.get<T>(
        `${endpoint}/${identifier || identifier === 0 ? identifier : ""}`,
      )
    ).data;
  }

  async getListResource<T>(
    endpoint: Endpoint,
    offset = 0,
    limit = 20,
  ): Promise<T> {
    return (
      await this.api.get<T>(`${endpoint}?_start=${offset}&_limit=${limit}`)
    ).data;
  }
}
