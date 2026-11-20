export interface UserResponse {
  id: number;
  email: string;
  role: unknown;
}

export interface UserTokenResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}
