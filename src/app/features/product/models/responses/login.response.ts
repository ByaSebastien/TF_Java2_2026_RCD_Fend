export interface UserResponse {
  id: number;
  email: string;
  role: unknown;
}

export interface UserTokenResponse {
  email: UserResponse;
  accessToken: string;
  refreshToken: string;
}
