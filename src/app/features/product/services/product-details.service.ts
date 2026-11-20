import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ProductDetailsResponse } from '../models/responses/product-details.response';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private readonly _http: HttpClient = inject(HttpClient);

  findById(id: number) {
    return this._http.get<ProductDetailsResponse>(`${environment.API_URL}/product/${id}`);
  }
}
