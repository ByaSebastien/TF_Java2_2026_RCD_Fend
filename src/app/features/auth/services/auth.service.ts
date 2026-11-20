import { HttpClient } from '@angular/common/http';
import { Service, inject} from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../register/register.model';

@Service()
export class AuthService {
    private readonly http = inject(HttpClient);

  private readonly apiUrl = '/api/auth';

  register(data: RegisterRequest): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

}
