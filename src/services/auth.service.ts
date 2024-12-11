import { ApiResponse, ApiService } from "./api";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
}

interface AuthResponse {
  success: boolean;
  token: string;
  message: string;
  user: {
    id: number;
    email: string;
    username: string;
    phoneNumber: string;
    role: string;
    avatar: string;
    isActive: boolean;
    birthday: string;
    createdAt: string;
    updatedAt: string;
  };
}

export class AuthService {
  private api: ApiService;

  constructor() {
    this.api = ApiService.getInstance();
  }

  public async login(
    credentials: LoginRequest
  ): Promise<ApiResponse<AuthResponse>> {
    return this.api.post<AuthResponse>("/Auth/login", credentials);
  }

  public async register(
    userData: RegisterRequest
  ): Promise<ApiResponse<AuthResponse>> {
    return this.api.post<AuthResponse>("/Auth/register", userData);
  }

  public async logout(): Promise<void> {
    localStorage.removeItem("auth-storage");
  }
}
