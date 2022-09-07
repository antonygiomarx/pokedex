import { Injectable } from '@nestjs/common';
import { AxiosAdapterService } from '../axios-adapter/axios-adapter.service';
import {
  HttpAdapter,
  RequestConfig,
  Response,
} from '../interfaces/adapter.interface';

@Injectable()
export class HttpAdapterService implements HttpAdapter {
  constructor(private readonly http: AxiosAdapterService) {}

  get<T>(url: string, config?: Record<string, unknown>): Promise<Response<T>> {
    return this.http.get<T>(url, config);
  }
  post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<Response<T>> {
    return this.http.post<T>(url, data, config);
  }
  put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<Response<T>> {
    return this.http.put<T>(url, data, config);
  }
  delete<T>(url: string, config?: RequestConfig): Promise<Response<T>> {
    return this.http.delete<T>(url, config);
  }
  patch<T>(
    url: string,
    data?: undefined,
    config?: RequestConfig,
  ): Promise<Response<T>> {
    return this.http.patch<T>(url, data, config);
  }
}
