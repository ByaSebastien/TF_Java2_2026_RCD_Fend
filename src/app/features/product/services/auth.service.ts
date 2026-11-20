import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UserResponse, UserTokenResponse } from '../models/responses/login.response';
import { LoginRequest, RefreshTokenRequest } from '../models/request/login.request';
import { finalize, Observable, tap } from 'rxjs';

@Service()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.API_URL;

  readonly user = signal<UserResponse | null>(null);

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  login(credentials: LoginRequest): Observable<UserTokenResponse> {
    return this.http
      .post<UserTokenResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(tap((response) => this.setSession(response)));
  }

  constructor() {
    const savedUser = localStorage.getItem('user');
    const savedAccessToken = localStorage.getItem('accessToken');
    const savedRefreshToken = localStorage.getItem('refreshToken');

    if (savedUser && savedAccessToken && savedRefreshToken) {
      try {
        this.user.set(JSON.parse(savedUser) as UserResponse);
        this.accessToken = savedAccessToken;
        this.refreshToken = savedRefreshToken;
      } catch {
        this.clearSession();
      }
    }
  }

  refresh(): Observable<UserTokenResponse> {
    if (!this.refreshToken) {
      throw new Error('Aucun refresh token disponible.');
    }

    const request: RefreshTokenRequest = {
      refreshToken: this.refreshToken,
    };

    return this.http
      .post<UserTokenResponse>(`${this.apiUrl}/refresh`, request)
      .pipe(tap((response) => this.setSession(response)));
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/logout`, null)
      .pipe(finalize(() => this.clearSession()));
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private setSession(response: UserTokenResponse): void {
    this.user.set(response.user);
    console.log("In");
    this.accessToken = response.accessToken;
    this.refreshToken = response.refreshToken;

    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  clearSession(): void {
    this.user.set(null);

    this.accessToken = null;
    this.refreshToken = null;

    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
