import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5024/api",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth-storage");
        if (token) {
          const parsedToken = JSON.parse(token).state.token;
          if (parsedToken) {
            config.headers.Authorization = `Bearer ${parsedToken}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem("auth-storage");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private handleResponse<T>(response: AxiosResponse): ApiResponse<T> {
    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  }

  private handleError(error: any): ApiResponse<never> {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
        error: error.message,
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
      error: "Unknown error",
    };
  }

  public async get<T>(url: string, params?: object): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<T>(url, { params });
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<T>(url, data);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.put<T>(url, data);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.delete<T>(url);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
}
