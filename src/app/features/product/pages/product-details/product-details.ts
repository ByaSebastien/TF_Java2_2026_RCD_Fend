import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from '../../services/product-details.service';
import { ProductDetailsResponse } from '../../models/responses/product-details.response';

@Component({
  imports: [],
  selector: 'app-product-details',
  styleUrl: './product-details.scss',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  private readonly _productDetailsService: ProductDetailsService = inject(ProductDetailsService);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);

  product: WritableSignal<ProductDetailsResponse | undefined> = signal(undefined);

  constructor() {
    const id = Number(this._route.snapshot.paramMap.get('id'));

    this._productDetailsService.findById(id).subscribe((product) => {
      this.product.set(product);
    });
  }
}
