import { HttpClient } from '@angular/common/http';
import { Service, inject} from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../register/register.model';
import { environment } from '../../../../environments/environment';

@Service()
export class AuthService {
    private readonly http = inject(HttpClient);

  register(data: RegisterRequest): Observable<unknown> {
    return this.http.post(`${environment.API_URL}/register`, data);
  }

}
