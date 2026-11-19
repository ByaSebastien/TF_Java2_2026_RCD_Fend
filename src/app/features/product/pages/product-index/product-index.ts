import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { PageModel } from '../../../../shared/models/page.model';
import { ProductIndexResponse } from '../../models/responses/product-index.response';

@Component({
  imports: [],
  selector: 'app-product-index',
  styleUrl: './product-index.scss',
  templateUrl: './product-index.html',
})
export class ProductIndex {

  private readonly _productService: ProductService = inject(ProductService);

  page: WritableSignal<PageModel<ProductIndexResponse> | undefined> = signal(undefined);

  constructor() {

    this._productService.findAll(0).subscribe(page => {
      this.page.set(page);
    })
  }
}
