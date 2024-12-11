export interface Address {
  id?: number;
  detailedAddress: string;
  district: string;
  city: string;
  country: string;
}

export interface AddressData {
  id?: number;
  customer: string;
  phoneNumber: string;
  isDefault: boolean;
  address: Address;
}
