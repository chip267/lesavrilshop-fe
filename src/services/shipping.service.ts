import { ApiService } from "./api";

export interface ShippingMethod {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export class ShippingService {
  private api: ApiService;

  constructor() {
    this.api = ApiService.getInstance();
  }

  public async getShippingMethods(): Promise<ShippingMethod[]> {
    const response = await this.api.get<ShippingMethod[]>("/ShippingMethod");
    return response.data || [];
  }
}
