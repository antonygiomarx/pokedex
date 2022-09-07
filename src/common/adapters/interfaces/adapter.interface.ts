export interface RequestConfig {
  headers?: Record<string, string>;
}

export interface Response<T> {
  status: number;
  data: T;
}
export interface HttpAdapter {
  get<T>(url: string, config?: Record<string, unknown>): Promise<Response<T>>;

  post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<Response<T>>;

  put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<Response<T>>;

  delete<T>(url: string, config?: RequestConfig): Promise<Response<T>>;

  patch<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<Response<T>>;
}
