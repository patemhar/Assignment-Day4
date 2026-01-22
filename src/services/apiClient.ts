import axios, { type AxiosInstance } from "axios";

class ApiClient {
  private readonly client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    });
    this.setUpInterceptor();
  }

  private setUpInterceptor(): void {
    this.client.interceptors.request.use((config) => {
      const token = "dummyToken"
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`
      return config;
    })
  }

  async get<T>(url: string, params?: object): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data: object): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data: object): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}

export default ApiClient;
