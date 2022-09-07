import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { HttpAdapter, RequestConfig } from '../interfaces/adapter.interface';

@Injectable()
export class AxiosAdapterService implements HttpAdapter {
  constructor(private readonly http: HttpService) {}

  async get<T>(url: string, config?: Record<string, unknown>) {
    const { data, status } = await this.http.get<T>(url, config).toPromise();

    return {
      status,
      data,
    };
  }
  async post<T>(url: string, data?: unknown, config?: RequestConfig) {
    return await this.http.post<T>(url, data, config).toPromise();
  }

  async put<T>(url: string, data?: unknown, config?: RequestConfig) {
    return this.http.put<T>(url, data, config).toPromise();
  }
  delete<T>(url: string, config?: RequestConfig) {
    return this.http.delete<T>(url, config).toPromise();
  }
  async patch<T>(url: string, data?: unknown, config?: RequestConfig) {
    return this.http.patch<T>(url, data, config).toPromise();
  }
}
