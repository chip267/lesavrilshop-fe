import { ApiResponse, ApiService } from "./api";
import { User } from "@/types/user";

export class UserService {
  private api: ApiService;

  constructor() {
    this.api = ApiService.getInstance();
  }

  public async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.api.get<User>("/users/me");
  }

  public async updateUser(formData: FormData): Promise<ApiResponse<User>> {
    // Override the default content-type for multipart/form-data
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("auth-storage")
              ? JSON.parse(localStorage.getItem("auth-storage")!).state.token
              : ""
          }`,
        },
      }
    );

    console.log(response);

    const data = await response.json();
    return {
      success: response.ok,
      data: response.ok ? data : null,
      message: !response.ok ? data.message : undefined,
    };
  }
}
