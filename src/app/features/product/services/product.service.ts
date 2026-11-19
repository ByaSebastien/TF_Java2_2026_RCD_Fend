import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PageModel } from '../../../shared/models/page.model';
import { ProductIndexResponse } from '../models/responses/product-index.response';

@Service()
export class ProductService {

  private readonly _http: HttpClient = inject(HttpClient);

  findAll(page: number) {
    return this._http.get<PageModel<ProductIndexResponse>>(`${environment.API_URL}/product?page=${page}`);
  }
}
