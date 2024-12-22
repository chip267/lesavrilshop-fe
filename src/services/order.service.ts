import { ApiResponse, ApiService } from "./api";
import { Order, OrderStatusType } from "@/types/order";

export class OrderService {
  private api: ApiService;

  constructor() {
    this.api = ApiService.getInstance();
  }

  public async getOrders(params: {
    page: number;
    pageSize: number;
    status?: string;
  }): Promise<ApiResponse<Order[]>> {
    // Directly pass the parameters, don't wrap them in a params object
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      pageSize: params.pageSize.toString(),
      ...(params.status && params.status !== "all"
        ? { status: params.status }
        : {}),
    }).toString();

    return this.api.get<Order[]>(`/Orders?${queryParams}`);
    // Or if your ApiService handles query params properly:
    // return this.api.get<Order[]>('/Orders', params);
  }

  public async getOrderStatuses(): Promise<ApiResponse<OrderStatusType[]>> {
    return this.api.get<OrderStatusType[]>("/Orders/statuses");
  }
}
