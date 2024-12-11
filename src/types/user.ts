export interface User {
  id: number;
  email: string;
  username: string;
  phoneNumber: string;
  role: string;
  avatar: string | null;
  isActive: boolean;
  birthday: string | null;
  createdAt: string;
  updatedAt: string;
}
