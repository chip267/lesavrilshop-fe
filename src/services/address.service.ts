import { ApiResponse, ApiService } from "./api";
import { AddressData } from "@/types/address";

interface CreateAddressDto {
  customer: string;
  phoneNumber: string;
  detailedAddress: string;
  district: string;
  city: string;
  country: string;
  isDefault: boolean;
}

interface UpdateAddressDto extends Partial<CreateAddressDto> {}

export class AddressService {
  private api: ApiService;

  constructor() {
    this.api = ApiService.getInstance();
  }

  public async getAddresses(): Promise<AddressData[]> {
    const response = await this.api.get<AddressData[]>("/Address");
    return response.data || [];
  }

  public async createAddress(data: CreateAddressDto): Promise<AddressData> {
    const response = await this.api.post<AddressData>("/Address", data);
    return response.data!;
  }

  // public async updateAddress(
  //   id: number,
  //   data: UpdateAddressDto
  // ): Promise<AddressData> {
  //   const response = await this.api.put<AddressData>(`/Address/${id}`, data);
  //   return response.data!;
  // }

  public async getAddress(id: string): Promise<ApiResponse<AddressData>> {
    return this.api.get<AddressData>(`/Address/${id}`);
  }

  public async updateAddress(
    id: string,
    data: any
  ): Promise<ApiResponse<AddressData>> {
    return this.api.put<AddressData>(`/Address/${id}`, data);
  }

  public async deleteAddress(id: string): Promise<ApiResponse<void>> {
    return this.api.delete<void>(`/Address/${id}`);
  }
}
