export interface User {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  createdAt: string;
}
